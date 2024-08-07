const { ValidationError, AppError } = require("../utils/errors/index");
const { Booking } = require("../models/index");
const { StatusCodes } = require("http-status-codes");

class BookingRepository {
  async create(data) {
    try {
        const booking = await Booking.create(data);
        // console.log("REPO LEVAL", booking)
        return booking;

    } catch (error) {
      if ((error.name = "SequelizeValidationError")) {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot create Booking",
        "there was some issue creating the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(bookingId, data){
    try {
      // await Booking.update(data,{where:{
      //   id : bookingId
      // }});

      const booking = await Booking.findByPk(bookingId);
      console.log("BOOKING STATUS",booking.status)
      if(booking.status){
        booking.status = data.status;
      }
      await booking.save();
      return booking;
          } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Cannot update Booking",
        "there was some issue updating the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }


}

module.exports = BookingRepository;
