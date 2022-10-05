import { FITSHeader } from "./FITSHeader.js";

export interface FITSParsed {
  header: FITSHeader;
  // data: Uint8Array[][];
  data: Array<Uint8Array>;
}
