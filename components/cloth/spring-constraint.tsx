export class SpringConstraint {
    particleIdx1: number;
    particleIdx2: number;
    restLength: number;
    stiffness: number;

    constructor(particleIdx1: number, particleIdx2:number, restLength: number, stiffness: number) {
        this.particleIdx1 = particleIdx1;
        this.particleIdx2 = particleIdx2;
        this.restLength = restLength;
        this.stiffness = stiffness
    }
}