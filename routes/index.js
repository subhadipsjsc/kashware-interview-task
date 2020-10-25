const router = require('express').Router();

const {validateLoginUser , validateURL} = require('../helpers/joi')
const {createAccessToken , validateAccessToken} = require('../helpers/jwt')
const {patchJson} = require('../helpers/json_patch')
const {download_and_create_thumbnil} = require('../helpers/thumbnil')

router.post('/auth', async(req,res,next) => {
    
    JoiValidationResult = validateLoginUser (req.body)
    
    
    if( JoiValidationResult.error != null   ){
        res.status(401).send({
            "success" : 0,
            "error" :JoiValidationResult.error,
        });
    }


    else{

        JWTpayloadData = {
            user:req.body.username,
            company : 'xyz',   //Some mock data
            country : 'USA'    //Some mock data
        }
        accessToken = createAccessToken(JWTpayloadData)
        res.status(200).send({
            "success" : 1,
            "accessToken" : accessToken,
        }); 
    }
    
        
    
});







router.get('/user_details', validateAccessToken , async(req,res,next) => {
    
    res.status(200).send({
        "success" : 1,
        "user" : patchJson(res.locals.authuser),
    }); 
     
});

router.post('/create_Thumbnail', validateAccessToken , async(req,res) => {
    let {url , error} = validateURL(req.body.imageurl)
    if(error == null){
        result = await download_and_create_thumbnil(url)
        res.status(200).send({
            "success" : 1,
            "thumbnil_image" : result,
        });
    }
    else{
        res.status(400).send({
            "success" : 0,
            "error" : error,
        });
    }
     
     
});



module.exports = router;