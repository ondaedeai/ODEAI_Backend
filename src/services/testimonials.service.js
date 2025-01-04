import Testimonials from "../models/Testimonials.js";

const createService = (body) => Testimonials.create(body);

const findAllService = () => Testimonials.find();

const findByIdService = (id) => Testimonials.findOne({ _id: id });

const deleteService = (id) => Testimonials.findByIdAndDelete(id);

const updateService = (id, updateData) =>
    Testimonials.findOneAndUpdate(
      { _id: id },
      updateData
    );

export default {
  createService,
  findAllService,
  deleteService,
  updateService,
  findByIdService
};
