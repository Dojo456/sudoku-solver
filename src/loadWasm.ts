export async function loadWasm() {
    const response = await fetch("/my-wasm.wasm");

    const module = await WebAssembly.instantiateStreaming(response);

    return module;
}
