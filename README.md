# jsFITS I/O library

Project available in github at https://github.com/fab77/jsfitsio#readme (previously available at https://github.com/fab77/FITSParser#readme). 


Library used to handle FITS files as defined in the "Definition of the Flexible Image Transport System (FITS)" document defined by internation Astronomical Union (IAU)

This library is capable to read and write FITS files where the data are represented in the following formats (BITPIX):


- 8 Character or unsigned binary integer
- 16 16-bit two’s complement binary integer
- 32 32-bit two’s complement binary integer
- 64 64-bit two’s complement binary integer
- −32 IEEE single-precision floating point
- −64 IEEE double-precision floating point


Only ImageHDU are supported at the moment. 

jsFITS I/O can be used as standalone Node module or integrated in the browser. 


## How to use the generated library available in Nodejs repository
Include the following dependency into package.json file in your project:
```
"dependencies": {
        "jsfitsio": "^1.2.1"
    },
```

## Installing as Javascript external file in a web page

Download the file "jfitsio.js" under _bundle directory and include it in your web page.


## Deployment as Node module

- Prerequisites:
  [Node.js](https://nodejs.org) v<=16
  (see [installation instructions](https://nodejs.org/en/download/package-manager))

- Clone repo:
```
git clone https://github.com/fab77/jsfitsio.git
```

- Move into the FITSParser folder:
```
cd FITSParser
```

- Install the required `dev` modules:
```
npm i
```

- Compile the project:
```
npm run build:prod
```

### reading FITS file available in the web:
```
import { FITSParser } from 'jsfitio';

const fileuri = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
const fp = new FITSParser(fileuri);
const promise = fp.loadFITS();
promise.then(function (fits) {
    if (fits !== null) {
        console.log(fits === null || fits === void 0 ? void 0 : fits.header);

        console.log(`BITPIX: ${fits.header.get('BITPIX')}`);
        console.log(`NAXIS1: ${fits.header.get('NAXIS1')}`);
        console.log(`NAXIS2: ${fits.header.get('NAXIS2')}`);
        console.log(`payload bytes length ${fits.data.length * fits.data[0].length}`);

    }
    else {
        console.log("Empty data");
    }
});
```



### using FITS available in the local filesystem:
```
import { FITSParser } from 'jsfitio';
import { FITSHeader } from 'jsfitio';
import { FITSWriter } from 'jsfitio';
import { writeFITS } from 'jsfitio'
import { FITSHeaderItem } from 'jsfitio';

const fileuri: string = "./test/inputs/x0c70103t_c1f.fits";
const fp = new FITSParser(fileuri);
const fitsPromise = fp.loadFITS();
fitsPromise.then( (fitsProcessed) => {
    let fitsHeader = fitsProcessed.header;
    let fitsData = fitsProcessed.data;
    let fw = new FITSWriter();
    fw.run(fits.header, fits.data);
    writeFITS("./MyFITS.fits", fw._fitsData);
});
```


## Deployment as a Javascript library

You need to include "jsfitsio.js" (take it from _bundles directory in git the repo https://github.com/fab77/FITSParser ) file in your HTML page. Below a sample.

```
<!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Webpack App</title>
    <base href="."/>
</head>

<body>
    <h1>Hello world!</h1>
    <h2>jsFITS I/O web integration sample</h2>
    <script src="./jsfitsio.js"></script>
    <script>
        let fitsURL = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits"
        let fp = new jsfitsio.FITSParser(fitsURL);
        let promise = fp.loadFITS();
        promise.then( (fits) => {
            if (fits !== null) {
                console.log(fits?.header);
                const blobUrl = jsfitsio.FITSParser.generateFITS(fits.header, fits.data);
                console.log(blobUrl);
            } else {
                console.log("Empty data");
            }
        });
    </script>
</body>

</html>
```

## Built With
Node: v16.17.0
webpack: 5.74.0

## Contributing

## Versioning

## Authors
* **Fabrizio Giordano**

## License

This project is licensed under the GPL License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* Yago Ascasibar
