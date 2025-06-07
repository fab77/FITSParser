var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFile } from "node:fs/promises";
// import path from 'path';
// import {fileURLToPath} from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
export function getLocalFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        // let buffer: Buffer;
        try {
            const response = yield readFile(path);
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
    });
}
//# sourceMappingURL=getLocalFile.js.map