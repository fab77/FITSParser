import FITSParser from "./src/FITSParser.js";

let fileuri = "/Users/fgiordano/Workspace/GitHub/FITSParser/test/inputs/Npix278.fits";
        let fp = new FITSParser(fileuri, function(res){
            console.log(res.header);
        });
