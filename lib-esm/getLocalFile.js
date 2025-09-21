import { readFile } from "node:fs/promises";
// import path from 'path';
// import {fileURLToPath} from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
export async function getLocalFile(path) {
    // let buffer: Buffer;
    try {
        const response = await readFile(path);
        if (response) {
            return response;
        }
        else {
            return null;
        }
        // buffer = await readFile(path);
    }
    catch (error) {
        console.error("Failed to read path:", path, "\nError:", error);
        return null;
    }
}
//# sourceMappingURL=getLocalFile.js.map