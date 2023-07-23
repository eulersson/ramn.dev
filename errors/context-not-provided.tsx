export class ContextNotProvidedError extends Error {
    constructor(contextName: string) {
        super()
        this.message = `useContext() returned null. Did you provide the context ${contextName}?`
    }
}