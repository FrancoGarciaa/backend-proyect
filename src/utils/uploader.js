import multer from "multer"
import __dirname from "./dirname"
import path from "path"


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname + "public/img"))
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

//***MIDDLEWARE*/

const uploader = multer({ storage })

export default uploader