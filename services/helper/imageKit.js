const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey:
    process.env.IMAGEKIT_PUBLIC_KEY || "public_4ry+u738KhNMbkLYP3UG0E89XwA=",
  privateKey:
    process.env.IMAGEKIT_PRIVATE_KEY || "private_GmNyPicjNBU0ToOIu+IYqZPnWnQ=",
  urlEndpoint:
    process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/arsa0",
});

module.exports = imageKit;
