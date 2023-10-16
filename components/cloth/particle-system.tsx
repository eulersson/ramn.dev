import { GridDimensions, Position, Size } from "@/types";
import { Particle } from "@/components/cloth/particle";
import { PinConstraint } from "@/components/cloth/pin-constraint";
import { SpringConstraint } from "@/components/cloth/spring-constraint";

type ClickCon = {
  active: boolean;
  breakable: boolean;
  constrained: number[];
  x: number;
  y: number;
  radius: number;
};

export class ParticleSystem {
  // --- Particles ---------------------------------------------------------------------
  curPositions: Particle[] = [];
  oldPositions: Particle[] = [];

  // --- Verlet Settings ---------------------------------------------------------------
  /**
   * More iterations would produce a more stable result but would be more expensive.
   */
  NUM_ITERATIONS = 1;

  /**
   * If you increase the number of iterations it's worth adjusting to time step, usually
   * inversely proportional.
   */
  TIMESTEP = 1.0;

  /**
   * The grid resolution of the cloth. Will determine how many particles to play with.
   */
  gridDimensions: GridDimensions = { rows: 20, cols: 40 };

  /**
   * The size of a facet, that is, the area comprised by four neighbouring points.
   */
  cellSize: Size = { w: 20, h: 20 };

  /**
   * Precalculated half-size (division is expensive) of the whole cloth width.
   */
  approximateHalfClothWidth = (this.gridDimensions.cols * this.cellSize.w) / 2;

  windowSize!: Size;
  windowHalfSize!: Size; // to prevent division on render loop
  groundPosition = 0;

  // --- Forces and Constraints --------------------------------------------------------

  /**
   * Defines what constraints are in place affecting the physics of the system.
   */
  constraints: Array<PinConstraint | SpringConstraint> = [];

  /**
   * All particles are subject to a general force of gravity.
   */
  gravity = { x: 0, y: -3.0 };
  extraGravity = { x: 0, y: 0 };

  /**
   * The forces that need to be applied are placed in this array before the verlet step
   * applies them and removes them from the list.
   */
  forceAccumulators: Array<{ x: number; y: number }> = [];

  /**
   * A global constraint that will end up placing {@link PinConstraint} on the particles
   * surrounding the click area.
   */
  clickCon: ClickCon = {
    active: false,
    breakable: false,
    constrained: [],
    x: 0,
    y: 0,
    radius: 34,
  };

  get empty() {
    return this.curPositions.length === 0;
  }

  get aproximateClothSize(): Size {
    const verticalStretchCausedByGravity = 2;
    const heightFactor = this.windowHalfSize.h * 0.05;
    console.log("hf", heightFactor);
    return {
      w: this.gridDimensions.cols * this.cellSize.w,
      h:
        this.gridDimensions.rows *
          this.cellSize.h *
          verticalStretchCausedByGravity +
        heightFactor,
    };
  }

  onWindowResize(size: Size) {
    this.windowSize = size;
    this.windowHalfSize = {
      w: size.w / 2,
      h: size.h / 2,
    };
    this.groundPosition = -this.windowSize.h;
  }

  populate(windowSize: Size, gridDimensions: GridDimensions) {
    this.windowSize = windowSize;
    this.windowHalfSize = { w: windowSize.w / 2, h: windowSize.h / 2 };
    this.groundPosition = -this.windowSize.h;

    // This creates a grid of particles connected following the rule:
    //   1. If it is in the first row just connect to LEFT.
    //   2. If it is in the first column DON'T' connect to LEFT.
    //   3. If it is not in either first row or last row connect to LEFT and UP.
    var { rows, cols } = gridDimensions;
    this.approximateHalfClothWidth = (this.cellSize.w * cols) / 2;

    var startX = 0;

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        var index = i * cols + j;
        var positionX = startX + j * this.cellSize.w;
        var positionY = -i * this.cellSize.h;

        this.addParticle(new Particle(positionX, positionY));

        if (i === 0) {
          // Top-most particle; don't link up, pin constrain.
          this.addConstraint(new PinConstraint(index, positionX, positionY));
          if (j === 0) {
            // Do nothing; has nothing on the left.
          } else {
            // Constraint just to left; has nothing on top.
            this.addConstraint(
              new SpringConstraint(
                index,
                index - 1,
                this.cellSize.w - this.cellSize.w * 0.2,
                1.0
              )
            );
          }
        } else if (j === 0) {
          // Left-most particle; don't link left.
          if (i === 0) {
            // Do nothing; has nothing on top
          } else {
            // constraint just to top
            this.addConstraint(
              new SpringConstraint(index, index - cols, this.cellSize.h, 1.0)
            );
          }
        } else {
          // constraint top and left
          this.addConstraint(
            new SpringConstraint(index, index - cols, this.cellSize.h, 1.0)
          );
          this.addConstraint(
            new SpringConstraint(
              index,
              index - 1,
              this.cellSize.w - this.cellSize.w * 0.2,
              0.8
            )
          );
        }
      }
    }
  }

  addParticle(particle: Particle) {
    this.curPositions.push(particle);
    this.oldPositions.push(particle);
  }

  addConstraint(con: PinConstraint | SpringConstraint) {
    this.constraints.push(con);
  }

  getPoints() {
    const flattenedPointData = this.curPositions
      .map((particle) => [particle.x, particle.y, 0])
      .flat();
    return flattenedPointData;
  }

  getConstraints() {
    const flattenedConstraintData = this.constraints
      .filter((c) => c instanceof SpringConstraint)
      .map((c) => c as SpringConstraint)
      .map((c) => [c.particleIdx1, c.particleIdx2])
      .flat();
    return flattenedConstraintData;
  }

  accumulateForces() {
    for (var i = 0; i < this.curPositions.length; i++) {
      this.forceAccumulators[i] = {
        x: this.gravity.x + this.extraGravity.x,
        y: this.gravity.y + this.extraGravity.y,
      };
    }
  }

  verlet() {
    for (var i = 0; i < this.curPositions.length; i++) {
      var pos = this.curPositions[i];
      var temp = pos;

      var oldpos = this.oldPositions[i];
      var a = this.forceAccumulators[i];

      pos.x = 2 * pos.x - oldpos.x + a.x * this.TIMESTEP * this.TIMESTEP;
      pos.y = 2 * pos.y - oldpos.y + a.y * this.TIMESTEP * this.TIMESTEP;

      this.curPositions[i] = pos;
      this.oldPositions[i] = temp;
    }
  }

  satisfyConstraints() {
    for (var it = 0; it < this.NUM_ITERATIONS; it++) {
      for (var i = 0; i < this.curPositions.length; i++) {
        // Make sure any particle goes below the ground or above ceiling.
        var pos = this.curPositions[i];
        pos.y = Math.min(0, Math.max(pos.y, this.groundPosition));
      }

      // Satisfy rest of the constraints (pin or spring).
      for (var i = 0; i < this.constraints.length; i++) {
        var alive = this.constraints[i].project(this.curPositions);
        if (!alive && this.clickCon.breakable) {
          // If constraint returns false means it should die (for example
          // exceeding) the distance threshold. If the user has also pressed the
          // left mouse button (so clickCon.breakable is true) we delete it.
          this.constraints.splice(i, 1);
        }
      }
    }
  }

  incrementGravity() {
    this.gravity.y -= 0.1;
  }

  decrementGravity() {
    this.gravity.y += 0.1;
  }

  setGravity(gravity: { x: number; y: number }) {
    this.gravity = gravity;
  }

  setExtraGravity(extraGravity: { x: number; y: number }) {
    this.extraGravity = extraGravity;
  }

  step() {
    this.accumulateForces();
    this.verlet();
    this.satisfyConstraints();
  }

  onMouseDown(mouseClientX: number, mouseClientY: number, mouseButton: number) {
    this.clickCon.active = true;

    const localMouse: Position = {
      x: mouseClientX - this.windowHalfSize.w,
      y: -(mouseClientY - this.windowHalfSize.h),
    };

    this.clickCon.x = localMouse.x;
    this.clickCon.y = localMouse.y;

    const that = this;

    this.curPositions.forEach(function (pos, idx) {
      if (
        Math.abs(pos.x - that.clickCon.x) < that.clickCon.radius &&
        Math.abs(pos.y - that.clickCon.y) < that.clickCon.radius
      ) {
        that.clickCon.constrained.push(idx);
        that.constraints.push(
          new PinConstraint(idx, that.clickCon.x, that.clickCon.y)
        );
      }
    }, this);
    this.clickCon.breakable = true;
    if (mouseButton == 1) {
      // Middle click
      this.clickCon.breakable = false;
    }
  }

  onMouseMove(mouseOffsetX: number, mouseOffsetY: number) {
    // Do not waste time on computing if the user has not clicked first.
    if (!this.clickCon.active) {
      return;
    }

    const localMouse = {
      x: mouseOffsetX - this.windowHalfSize.w,
      y: -(mouseOffsetY - this.windowHalfSize.h),
    };

    this.clickCon.x = localMouse.x;
    this.clickCon.y = localMouse.y;

    for (var i = 0; i < this.clickCon.constrained.length; i++) {
      var c = this.constraints[
        this.constraints.length - 1 - i
      ] as PinConstraint;
      c.x = this.clickCon.x;
      c.y = this.clickCon.y;
    }
  }

  onMouseUp() {
    this.clickCon.active = false;

    for (var i = 0; i < this.clickCon.constrained.length; i++) {
      this.constraints.pop();
    }

    this.clickCon.constrained = [];
  }

  destroy() {
    this.curPositions = [];
    this.oldPositions = [];
    this.constraints = [];
  }
}
