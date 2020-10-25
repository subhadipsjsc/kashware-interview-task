require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    jwt: {
      secret: process.env.JWT_SECRET,
      accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    },
    image_download_folder : process.env.IMAGE_DOWNLOAD_FOLDER,
    image_thumbnil_folder : process.env.IMAGE_THUMBNIL_FOLDER,

};