import { Particle } from "@/components/cloth/particle";
import { PinConstraint } from "@/components/cloth/pin-constraint";
import { SpringConstraint } from "@/components/cloth/spring-constraint";

export class ParticleSystem {
  constraints: Array<PinConstraint | SpringConstraint> = [];
  curPositions: Array<Particle> = [];
  oldPositions: Array<Particle> = [];

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
    // This creates a grid of particles connected following the rule:
    //   1. If it is in the first row just connect to LEFT.
    //   2. If it is in the first column DON'T' connect to LEFT.
    //   3. If it is not in either first row or last row connect to LEFT and UP.
    var cWidth = 20;
    var cHeight = 20;
    var rows = clothHeight;
    var cols = clothWidth;
    var startX = windowWidth / 2.0 - (rows * cWidth) / 2.0;

    let foo = 0;

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        var index = i * rows + j;
        var positionX = startX + j * cWidth;
        var positionY = windowHeight - i * cHeight;

        this.addParticle(new Particle(positionX, positionY));

        if (i === 0) {
          // first in the colum, dont link up, pin constrain
          this.addConstraint(new PinConstraint(index, positionX, positionY));
          if (j === 0) {
            // do nothing
          } else {
            // constraint just to left
            this.addConstraint(
              new SpringConstraint(index, index - 1, cWidth - cWidth * 0.2, 1.0)
            );
            foo += 1;
          }
        } else if (j === 0) {
          // first in the row, dont link left
          if (i === 0) {
            // do nothing
          } else {
            // constraint just to top
            this.addConstraint(
              new SpringConstraint(index, index - cols, cHeight, 1.0)
            );
            foo += 1;
          }
        } else {
          // constraint top and left
          this.addConstraint(
            new SpringConstraint(index, index - cols, cHeight, 1.0)
          );
          foo += 1;
          this.addConstraint(
            new SpringConstraint(index, index - 1, cWidth - cWidth * 0.2, 0.8)
          );
          foo += 1;
        }
      }
    }
    console.log("foo", foo);
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

  accumulateForces() {}

  verlet() {}

  satisfyConstraints() {}

  step() {
    this.accumulateForces();
    this.verlet();
    this.satisfyConstraints();
  }
}
