import Professional from "../models/Professional.js";

// @desc    Create professional profile
// @route   POST /api/professionals
export const createProfessional = async (req, res) => {
  try {
    const professional = await Professional.create({
      user: req.user._id,
      profession: req.body.profession,
      bio: req.body.bio,
      location: req.body.location,
    });
    res.status(201).json(professional);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all professionals
// @route   GET /api/professionals
export const getProfessionals = async (req, res) => {
  try {
    const pros = await Professional.find().populate("user", "name email");
    res.json(pros);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
