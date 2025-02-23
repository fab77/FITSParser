// import { FITSHeader } from "./FITSHeader.js";
import { FITSHeaderManager } from "./FITSHeaderManager.js";

export interface FITSParsed {
  header: FITSHeaderManager;
  data: Array<Uint8Array>;
}
