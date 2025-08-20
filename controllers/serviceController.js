import Service from "../models/Service.js";

// @desc    Create service
// @route   POST /api/services
export const createService = async (req, res) => {
  try {
    const service = await Service.create({
      professional: req.body.professional,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all services
// @route   GET /api/services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate("professional", "profession");
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
