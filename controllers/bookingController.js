import Booking from "../models/Booking.js";

// @desc    Create booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      client: req.user._id,
      service: req.body.service,
      date: req.body.date,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get my bookings
// @route   GET /api/bookings/my
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ client: req.user._id })
      .populate("service")
      .populate("client", "name email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
