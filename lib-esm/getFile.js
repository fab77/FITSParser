import fetch from 'cross-fetch';
export async function getFile(uri) {
    let buffer;
    // let response = await fetch(uri)
    // if (response?.ok){
    //   buffer = await response.arrayBuffer();
    // } else {
    //   console.log("No file found "+ uri)
    //   return null
    // }
    try {
        const response = await fetch(uri);
        if (response?.ok) {
            buffer = await response.arrayBuffer();
        }
        else {
            console.log("No file found " + uri);
            return null;
        }
    }
    catch (error) {
        console.error("Failed to fetch URI:", uri, "\nError:", error);
        return null;
    }
    return buffer;
}
//# sourceMappingURL=getFile.js.map