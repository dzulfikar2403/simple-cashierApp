const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/produkImg');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +  file.originalname)
  }
})

const fileFilter = (req,file,cb) => {
  if(file.mimetype.includes('png') || file.mimetype.includes('jpg') || file.mimetype.includes('jpeg')){
    cb(null, true);
  }else{
    cb(null, false);
    req.fileValidationErr = 'file type not allowed';
  }
}


var upload = multer({ storage,fileFilter })

module.exports = upload;