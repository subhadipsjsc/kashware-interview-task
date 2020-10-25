const sharp = require('sharp');
const config = require('../config')
const {download_image} = require('./downloadimage');


const random10to6th = ()=> {
    return parseInt(new Date().getTime() + Math.random()) 
}


const createthumbnil = async(fromimage, toimage)=> {
   return new Promise((resolve, reject) => {
        sharp(fromimage)
        .resize(300, 200)
        .toFile(toimage, function(err,data) {
            if(err){
                reject(err) 
            }
            else{
                resolve(true)
            }
            
        });
    })
}





const download_and_create_thumbnil = async (url)=>{
    try{
        let randomImageName = random10to6th()+'.jpeg';

        let downloadImageFile= config.image_download_folder+randomImageName
        let thumbnilImageFile= config.image_thumbnil_folder+randomImageName
        
        let newfile = await download_image (url, downloadImageFile)
        let savedthumbnilimge = await createthumbnil(newfile, thumbnilImageFile)
        
        if(savedthumbnilimge == true){
            return randomImageName;
        }
        
        
    }
    catch(e){
        console.log(e)
    }
    
}

module.exports = {
    download_and_create_thumbnil
}
