import { FITSHeader } from "./FITSHeader";

export interface FITSParsed {
    header: FITSHeader,
	// data: Uint8Array[][];
    data: Array<Uint8Array>;
}