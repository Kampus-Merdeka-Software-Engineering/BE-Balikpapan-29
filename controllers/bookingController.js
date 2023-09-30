const {bookingService} = require('../services')
async function getBooking(res,res) {
    const booking = await bookingService.getAllBooking();

    res.status(200).json(booking);
};


async function createBooking(res,res) {
    const booking = req.body;

    const createdBooking = await bookingService.createBooking(booking);

    res.status(201).json({
        message: 'booking created'
    });
};



module.exports = {
    getBooking,
    createBooking
};