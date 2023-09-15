var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'cross-fetch';
// export async function getFile(uri: string): Promise<ArrayBuffer | Buffer> {
export function getFile(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        // let response: Response;
        // response = await fetch(uri);
        // if (!response.ok) {
        //   return new ArrayBuffer(0);
        // } else {
        //   return response.arrayBuffer();
        // }
        let buffer;
        // buffer = await (await fetch(uri)).arrayBuffer();
        let response = yield fetch(uri);
        if (response === null || response === void 0 ? void 0 : response.ok) {
            buffer = yield response.arrayBuffer();
        }
        else {
            console.log("No file found " + uri);
            return null;
        }
        return buffer;
    });
}
//# sourceMappingURL=getFile.js.map