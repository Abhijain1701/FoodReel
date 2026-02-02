const ImageKit=require("imagekit");

let imagekit = null;

// Only initialize ImageKit if keys are provided
if (process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL_ENDPOINT) {
    imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
}

// This method is used to upload file to imagekit
async function uploadFile(file, fileName) {
    if (!imagekit) {
        console.warn("ImageKit not configured. Returning placeholder URL.");
        return { url: "https://placeholder.com/video.mp4" };
    }

    const result = await imagekit.upload({
        file: file,
        fileName: fileName,
    });

    return result;
}

module.exports = {
    uploadFile
}
