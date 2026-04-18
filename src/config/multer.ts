import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 } from "uuid";

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Get folder from request object, default to 'others'
        const folder = (req as any).uploadFolder || 'others';
        const uploadPath = `src/public/images/${folder}/`;
        
        // Ensure directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Use UUID to prevent name collisions
        cb(null, v4() + path.extname(file.originalname));
    }
});

// Create the upload middleware
const upload = multer({ 
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

export default upload;
