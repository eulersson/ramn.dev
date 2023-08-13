import { Particle } from "./particle";

export class SpringConstraint {
  breakingThreshold = 200;
  particleIdx1: number;
  particleIdx2: number;
  restLength: number;
  stiffness: number;

  constructor(
    particleIdx1: number,
    particleIdx2: number,
    restLength: number,
    stiffness: number
  ) {
    this.particleIdx1 = particleIdx1;
    this.particleIdx2 = particleIdx2;
    this.restLength = restLength;
    this.stiffness = stiffness;
  }

  project(curPositions: Particle[]) {
    var pos1 = curPositions[this.particleIdx1];
    var pos2 = curPositions[this.particleIdx2];

    var delta = { x: pos2.x - pos1.x, y: pos2.y - pos1.y };
    var deltalength = Math.sqrt(delta.x * delta.x + delta.y * delta.y);

    var diff = (deltalength - this.restLength) / deltalength;

    pos1.x += delta.x * 0.5 * this.stiffness * diff;
    pos1.y += delta.y * 0.5 * this.stiffness * diff;

    pos2.x -= delta.x * 0.5 * this.stiffness * diff;
    pos2.y -= delta.y * 0.5 * this.stiffness * diff;

    curPositions[this.particleIdx1] = pos1;
    curPositions[this.particleIdx2] = pos2;

    if (deltalength < this.breakingThreshold) {
      return true;
    } else {
      return false;
    }
  }
}
