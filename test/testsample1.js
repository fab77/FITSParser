

convertTo16bit2sComplement(2302);
convertTo32bit2sComplement(2302);
convertTo64bit2sComplement(2302);

convertTo32bitIEEEfloatingPoint(32.14);
convertTo64bitIEEEfloatingPoint(32.14);

function convertTo16bit2sComplement(num) { // bitpix 16
    console.log(`[16bit2sComplement]: ${num}`)
    let buffer = new ArrayBuffer(2);
    let res = new Int16Array(buffer);
    res[0] = num;
    console.log(res);
    let uint8 = new Uint8Array(buffer);
    console.log(uint8);
}

function convertTo32bit2sComplement(num) { // bitpix 32
    console.log(`[32bit2sComplement]: ${num}`)
    let buffer = new ArrayBuffer(4);
    let res = new Int32Array(buffer);
    res[0] = num;
    console.log(res);
    let uint8 = new Uint8Array(buffer);
    console.log(uint8);
}

function convertTo64bit2sComplement(num) { // bitpix 64
    console.log(`[64bit2sComplement]: ${num}`)
    let buffer = new ArrayBuffer(8);
    const n = BigInt(num);
    let res = new BigInt64Array(buffer);
    res[0] = n;
    console.log(res);
    let uint8 = new Uint8Array(buffer);
    console.log(uint8);
}

function convertTo32bitIEEEfloatingPoint(num) { // bitpix -32
    console.log(`[32bitIEEEfloatingPoint]: ${num}`)
    let buffer = new ArrayBuffer(4);
    let res = new Float32Array(buffer);
    res[0] = num;
    console.log(res);
    let uint8 = new Uint8Array(buffer);
    console.log(uint8);
}

function convertTo64bitIEEEfloatingPoint(num) { // bitpix -64
    console.log(`[64bitIEEEfloatingPoint]: ${num}`)
    let buffer = new ArrayBuffer(8);
    let res = new Float64Array(buffer);
    res[0] = num;
    console.log(res);
    let uint8 = new Uint8Array(buffer);
    console.log(uint8);
    
    let b1 = new ArrayBuffer(8);
    const eres = new Uint8Array(b1);
    eres[0] = 82;
    eres[1] = 184;
    eres[2] = 30;
    eres[3] = 133;
    eres[4] = 235;
    eres[5] = 17;
    eres[6] = 64;
    eres[7] = 64;
    
    
    console.log(`eres ${eres}`);
    console.log(eres);
    let ef = new Float64Array(b1);
    console.log(`ef ${ef}`);

}
