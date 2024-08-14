import multer from "multer";
import { v4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${v4()}-${file.originalname}`
    );
  },
});

const upload = multer({
  storage,
});

export default upload;
