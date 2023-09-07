import environment from "@/environment";

export default function WorkNotFound() {
    if (environment.printComponentRendering) {
        console.log("[WorkNotFound] Rendering")
    }
    return <h1>WorkNotFound...</h1>
}