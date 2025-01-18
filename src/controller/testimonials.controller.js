import testimonialsService from "../services/testimonials.service.js";

const getTestimonials = async (req, res) => {
  try {
    let testimonials = await testimonialsService.findAllService();
    const serverUrl = req.protocol + "://" + req.get("host");
    testimonials = testimonials.map((testimonials) => {
      if (testimonials.image) {
        testimonials.image = `${serverUrl}/testimonials/image/${testimonials._id}`;
      }
      return testimonials;
    });

    res.status(200).json(testimonials);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getImage = async (req, res) => {
  try {
    const id = req.params.id;
    const testimonials = await testimonialsService.findByIdService(id);

    if (!testimonials || !testimonials.image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const base64Data = testimonials.image;
    const imgBuffer = Buffer.from(base64Data, "base64");

    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": imgBuffer.length,
    });
    res.end(imgBuffer);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addTestimonials = async (req, res) => {
  try {
    const requiredFields = ["title", "nameInterviewed", "interviewerName", "description", "date"];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Please add the field ${field}` });
      }
    }

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    const { title, nameInterviewed, interviewerName, description, date } = req.body;

    const base64Data = req.file.buffer.toString('base64');

    const testimonials = await testimonialsService.createService({
      title,
      nameInterviewed,
      interviewerName,
      description,
      date,
      image: base64Data,
    });

    res.status(201).json({
      message: "Testimonials registered successfully",
      id: testimonials._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const updateTestimonials = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ error: `Please add the testimonials id as a request param` });
    }

    const requiredFields = ["title", "nameInterviewed", "interviewerName", "description", "date"];

    for (const field of requiredFields) {
      if (!req.body[field] && !req.file) {
        return res
          .status(400)
          .json({ error: `Please add the field ${field} or upload an image` });
      } else {
        break;
      }
    }

    const { title, nameInterviewed, interviewerName, description, date} = req.body;
    let base64Data;

    if (req.file) {
      base64Data = req.file.buffer.toString('base64');
    }

    //TODO: criar middleware que pega o id do usuário e testa se é admin

    const updatedData = {};
    if (title) updatedData.title = title;
    if (nameInterviewed) updatedData.nameInterviewed = nameInterviewed;
    if (interviewerName) updatedData.interviewerName = interviewerName;
    if (description) updatedData.description = description;
    if (date) updatedData.date = date;
    if (base64Data) updatedData.image = base64Data;

    const result = await testimonialsService.updateService(
      id,
      updatedData
    );

    if (!result) {
      res.status(404).json({ message: "Testimonials not found" });
    } else {
      res
        .status(204)
        .json({ message: "Testimonials update successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTestimonials = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ message: `Please add the testimonials id as a request param` });
    }

    const result = await testimonialsService.deleteService(id);

    if (!result) {
      res.status(404).json({ error: "Testimonials not found" });
    } else {
      res.status(204).json({ menssage: "Testimonials succesfully deleted" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getTestimonials,
  addTestimonials,
  deleteTestimonials,
  updateTestimonials,
  getImage,
};
