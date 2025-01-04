import mongoose from 'mongoose';

const TestimonialsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    nameInterviewed: {
        type: String,
        required: true
    },
    interviewerName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
      },
})

const Testimonials = mongoose.model("Testimonials", TestimonialsSchema);
export default Testimonials;
