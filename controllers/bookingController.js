const {bookingService} = require('../services');

async function getBooking(req,res) {
    const booking = await bookingService.getAllBooking();

    res.status(200).json(booking);
};


async function createBooking(req,res) {
    const booking = req.body;

    const createdBooking = await bookingService.createBooking(booking);

    res.status(201).json({
        message: 'booking created',
        data: createdBooking
    });
};



module.exports = {
    getBooking,
    createBooking
};