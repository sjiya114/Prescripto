const multer=require('multer');
const storage=multer.diskStorage({
filename:(req,file,callback)=>
{
return callback(null,file.originalname);
}
});
module.exports.upload=multer({storage});