const path = require("path");
const { v4: uuidv4 } = require('uuid')

const subirArchivo = ( files, extensionValidas = [ "png", "jpg", "jpeg", "gif" ], carpeta ) => {
    
    return new Promise ( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split(".");
        const extension = nombreCortado[nombreCortado.length - 1]
    
        //Validar entension
        if( !extensionValidas.includes(extension) ){
           return reject( `La extension ${ extension } no es permitida. Se permiten ${ extensionValidas }` )
        }
       
        const nombreTemp = uuidv4() + "." + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );
    
        archivo.mv(uploadPath, function(err) {
            if (err){
                return reject(err);
            }
    
            resolve( uploadPath )
        });
    })

    

}

module.exports = {
    subirArchivo
}