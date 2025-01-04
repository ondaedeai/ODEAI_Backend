import testimonialsController from '../controller/testimonials.controller.js';
import express from 'express';
import cors from 'cors';
import { validId } from "../middlewares/global.middlewares.js";
import multer from 'multer';


const app = express();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(cors());

const route = express.Router();
route.get('/all', testimonialsController.getTestimonials);
route.get('/image/:id', testimonialsController.getImage);
route.patch('/:id', validId, upload.single('image'),  testimonialsController.updateTestimonials);
route.delete('/:id', validId, testimonialsController.deleteTestimonials);
route.post('/create',  upload.single('image'), testimonialsController.addTestimonials);


export default route;
