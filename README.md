# jsFITS I/O library

Library used to handle FITS files as defined in the "Definition of the Flexible Image Transport System (FITS)" document defined by internation Astronomical Union (IAU)

This library is capable to read and write FITS files where the data are represented in the following formats (BITPIX):


8 Character or unsigned binary integer
16 16-bit two’s complement binary integer
32 32-bit two’s complement binary integer
64 64-bit two’s complement binary integer
−32 IEEE single-precision floating point
−64 IEEE double-precision floating point


Only ImageHDU are supported at the moment. 

jsFITS I/O can be used as standalone Node module or integrated in the browser. 

## Getting Started

### Installing as node module
```
$ npm install jsfitio
```

### Installing as Javascript external file in a web page

Download the file "jfitsio.js" and include it in your web page as below:


## Running the tests

Test defined with "jest"

### Break down into end to end tests
```
$ npm run test:integration
```

## Deployment as Node module

### using FITS file available in the web:
```
import { FITSParser } from 'jsfitio';

const fileuri: string = "http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits";
const fp = new FITSParser(fileuri);
const fitsPromise = fp.loadFITS();
fitsPromise.then( (fitsProcessed) => {
    let fitsHeader = fitsProcessed.header;
    let fitsData = fitsProcessed.data;
    FITSParser.writeFITS(fits.header, fits.data, "./MyFITS.fits");
});
```

### using FITS available in the local filesystem:
```
import { FITSParser } from 'jsfitio';

const fileuri: string = "./test/inputs/x0c70103t_c1f.fits";
const fp = new FITSParser(fileuri);
const fitsPromise = fp.loadFITS();
fitsPromise.then( (fitsProcessed) => {
    let fitsHeader = fitsProcessed.header;
    let fitsData = fitsProcessed.data;
    FITSParser.writeFITS(fits.header, fits.data, "./MyFITS.fits");
});
```


## Deployment as a Javascript library

You need to include "jsfitsio.js" file in your HTML page. Below a sample.

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
        let promise = FITSioAPI.default("http://skies.esac.esa.int/Herschel/normalized/PACS_hips160//Norder8/Dir40000/Npix47180.fits")
        promise.then( (fitsProcessed) => {
            let fitsHeader = fitsProcessed.header;
            let fitsData = fitsProcessed.data;
            console.log(fitsHeader);
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

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Yago Ascasibar
