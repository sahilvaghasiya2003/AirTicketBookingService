const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");
const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    console.log("FROM BOOKING CONTROLLER ", response);
    return res.status(StatusCodes.OK).json({
      message: "successfully completed booking",
      success: true,
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("FROM BOOKING CONTROLLER ERROR", error);

    return res.status(error.statusCode).json({
      data: {},
      success: false,
      message: error.message,
      err: error.explanation,
    });
  }
};

module.exports = { create };
