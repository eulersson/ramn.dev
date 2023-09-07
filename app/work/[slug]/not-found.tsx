import environment from "@/environment";

export default function ProjectNotFound() {
    if (environment.printComponentRendering) {
        console.log("[ProjectNotFound] Rendering")
    }
    return <h1>ProjectNotFound...</h1>
}