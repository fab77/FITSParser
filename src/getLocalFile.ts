import { readFile } from "node:fs/promises";
// import path from 'path';
// import {fileURLToPath} from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export async function getLocalFile(path:string) {
    let buffer: Buffer;
    buffer = await readFile(path);
    return buffer;
    
}
