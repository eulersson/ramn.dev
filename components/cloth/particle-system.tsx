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
  constraints: Array<PinConstraint | SpringConstraint> = [];
  curPositions: Particle[] = [];
  oldPositions: Particle[] = [];

  gravity = { x: 0, y: -3.0 };

  forceAccumulators: Array<{ x: number; y: number }> = [];
  NUM_ITERATIONS = 1;
  TIMESTEP = 1.0;

  windowWidth!: number;
  windowWidthHalf!: number; // to prevent division on render loop
  windowHeight!: number;
  windowHeightHalf!: number; // to prevent division on render loop

  clickCon: ClickCon = {
    active: false,
    breakable: false,
    constrained: [],
    x: 0,
    y: 0,
    radius: 20,
  };

  get empty() {
    return this.curPositions.length === 0;
  }

  onWindowResize(width: number, height: number) {
    console.log("onWindowResize");
  }

  populate(
    windowWidth: number,
    windowHeight: number,
    clothWidth: number,
    clothHeight: number
  ) {
    this.windowWidth = windowWidth;
    this.windowWidthHalf = windowWidth / 2;
    this.windowHeight = windowHeight;
    this.windowHeightHalf = windowHeight / 2;
    // This creates a grid of particles connected following the rule:
    //   1. If it is in the first row just connect to LEFT.
    //   2. If it is in the first column DON'T' connect to LEFT.
    //   3. If it is not in either first row or last row connect to LEFT and UP.
    var cWidth = 20;
    var cHeight = 20;
    var rows = clothHeight;
    var cols = clothWidth;
    var startX = 0;
    // -6

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        var index = i * cols + j;
        var positionX = startX + j * cWidth;
        var positionY = -i * cHeight;

        this.addParticle(new Particle(positionX, positionY));

        if (i === 0) {
          // Top-most particle; don't link up, pin constrain.
          this.addConstraint(new PinConstraint(index, positionX, positionY));
          if (j === 0) {
            // Do nothing; has nothing on the left.
          } else {
            // Constraint just to left; has nothing on top.
            this.addConstraint(
              new SpringConstraint(index, index - 1, cWidth - cWidth * 0.2, 1.0)
            );
          }
        } else if (j === 0) {
          // Left-most particle; don't link left.
          if (i === 0) {
            // Do nothing; has nothing on top
          } else {
            // constraint just to top
            this.addConstraint(
              new SpringConstraint(index, index - cols, cHeight, 1.0)
            );
          }
        } else {
          // constraint top and left
          this.addConstraint(
            new SpringConstraint(index, index - cols, cHeight, 1.0)
          );
          this.addConstraint(
            new SpringConstraint(index, index - 1, cWidth - cWidth * 0.2, 0.8)
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
      this.forceAccumulators[i] = this.gravity;
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
      // Satisfy first constraint (box bounds)
      for (var i = 0; i < this.curPositions.length; i++) {
        var pos = this.curPositions[i];
        pos.x = Math.min(
          Math.max(pos.x, -this.windowWidthHalf),
          this.windowWidthHalf
        );
        pos.y = Math.min(
          Math.max(pos.y, -this.windowHeightHalf),
          this.windowHeightHalf
        );
      }

      // Satisfy rest of the constraints (pin or spring)
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

  step() {
    this.accumulateForces();
    this.verlet();
    this.satisfyConstraints();
  }

  onMouseDown(mouseClientX: number, mouseClientY: number, mouseButton: number) {
    const localMouseX = mouseClientX - this.windowWidthHalf;
    const localMouseY = -(mouseClientY - this.windowHeightHalf);

    this.clickCon.active = true;
    this.clickCon.x = localMouseX;
    this.clickCon.y = localMouseY;

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
    const localMouseX = mouseOffsetX - this.windowWidthHalf;
    const localMouseY = -(mouseOffsetY - this.windowHeightHalf);
    // console.log(localMouseX, localMouseY);
    if (this.clickCon.active) {
      this.clickCon.x = localMouseX;
      this.clickCon.y = localMouseY;

      for (var i = 0; i < this.clickCon.constrained.length; i++) {
        var c = this.constraints[
          this.constraints.length - 1 - i
        ] as PinConstraint;
        c.x = this.clickCon.x;
        c.y = this.clickCon.y;
      }
    }
  }

  onMouseUp() {
    this.clickCon.active = false;
    for (var i = 0; i < this.clickCon.constrained.length; i++) {
      this.constraints.pop();
    }
    this.clickCon.constrained = [];
  }
}
