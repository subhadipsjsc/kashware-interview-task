const fs = require('fs')  
const axios = require('axios');


const download_image = (url, image_path) => axios({
    url,responseType: 'stream'
})
.then(response =>
    new Promise((resolve, reject) => {
        console.log(url)
        response.data
        .pipe(fs.createWriteStream(image_path))
        .on('finish', () => resolve(image_path))
        .on('error', e => reject(e));
    }),
)



module.exports = {
    download_image
}