const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");
const bookingService = new BookingService();
const {createChannel, publishMessage, subscribeMessage} = require('../utils/messageQueue')
const {REMINDER_BINDING_KEY} =  require('../config/server-config')
class BookingController {

  constructor(){
  }

  async sendMessageToQueue(req,res){
    const channel = await createChannel();
    const data = {message: 'Success'}
    publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
     res.status(200).json({
      message: "Succesfully published the event"
    })
  }

  async create(req, res) {
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
  }
}

module.exports =  BookingController ;
