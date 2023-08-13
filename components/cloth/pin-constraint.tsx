import { Particle } from "./particle";

/** The pin constraint hard pins a particle to a specific position in space. */
export class PinConstraint {
  /**
   * Index of the particle that needs to be constrained.
   */
  particleIndex: number;

  /**
   * X position the particle needs to be hard constrained to.
   */
  x: number;

  /**
   * Y position the particle needs to be hard constrained to.
   */
  y: number;

  /**
   * Creates an instance of pin constraint. This constraint will be used as rule
   * for modifying two particles (projection).
   *
   * @param particleIdx Index of the particle that needs to be constrained.
   * @param x X position the particle needs to be hard constrained to.
   * @param y Y position the particle needs to be hard constrained to.
   */
  constructor(particleIdx: number, x: number, y: number) {
    this.particleIndex = particleIdx;
    this.x = x;
    this.y = y;
  }

  project(curPositions: Particle[]) {
    curPositions[this.particleIndex] = { x: this.x, y: this.y };
    return true;
  }
}