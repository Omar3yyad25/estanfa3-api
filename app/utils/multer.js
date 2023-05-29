const multer = require("multer")
const path = require("path")
const {randomUUID} =  require("crypto")


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `/root/estanfa3-api/uploads/`)
  },
  filename: (req, file, cb) => {
    // generate a unique filename using uuid
    const ext = path.extname(file.originalname)
    const filename = `${randomUUID()}${ext}`
    cb(null, filename)
  },
})

const upload = multer({
  storage
})

// create list of fields from config
const fields = [{name: "image"}]


function MulterUploader (req, res, next) {
    upload.fields(fields)(req, res, (err) => {
        if (err){
            console.log(err)
        }
        // Everything went fine.
        next()
    })
}

module.exports = { upload, MulterUploader }