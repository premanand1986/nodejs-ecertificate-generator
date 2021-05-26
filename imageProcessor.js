const Jimp = require('./node_modules/jimp');
const fs = require('fs');
const CERTIFICATE_CONFIG_LOCATION = './certJsons/certJson.json';


function printOnImage(image , label_placeholders, props, index , callback){
        
    let label_placeholder = label_placeholders[index];
    
    Jimp.loadFont(label_placeholder.font_url).then(font => {
        
        let textObj = {};
        //textObj.text = label_placeholder.label
        textObj.text = props[label_placeholder.param_name];
        if(label_placeholder.alignmentX)
            textObj.alignmentX = Jimp[label_placeholder.alignmentX]
        if(label_placeholder.alignmentY)
            textObj.alignmentY = Jimp[label_placeholder.alignmentY]
        
        image.print(
                font,
                label_placeholder.x,
                label_placeholder.y,
                textObj,
                (label_placeholder.maxWidth||undefined)
        );

        if(label_placeholders[index+1])
            printOnImage(image , label_placeholders ,props, index+1 , callback)
        else
            callback(image , label_placeholder);
    });
}
  
function getCertJson(tmpl_id){
let rawCertJson = fs.readFileSync(CERTIFICATE_CONFIG_LOCATION);
    let certJson = JSON.parse(rawCertJson);
    return certJson;
}

function generateImageFromJson(props, tmpl_id,  cb){
    
    const certJson = getCertJson(tmpl_id);
    
    Jimp.read(certJson.certificate_template)
        .then(image => {

            printOnImage(image, certJson.label_placeholders, props , 0 , function(image ,label_placeholder){
                image.write(certJson.certificate_template_out, function(){
                    cb(certJson.certificate_template_out);
                });

            });
        });
}

module.exports = {
    generateImage:generateImageFromJson
}




  




  
