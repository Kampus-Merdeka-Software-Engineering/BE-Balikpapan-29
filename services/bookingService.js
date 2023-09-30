const {} = require('../config/prisma')

async function getAllBooking() {
    try {
        const booking = await prisma.booking.findMany();

        return booking;
    } catch (error) {
        // console.eror(error);

        // throw new Error()
    }

};
async function createBooking(booking) {
    try {
        const mappedBooking = {
            data: {
                id: booking.id,
                name: booking.name,
                email: booking.email,
                phone: booking.phone,
                service: booking.service,
                doctor: booking.doctor,
                reservationdate: booking.reservationdate,
                reservationtime: booking.reservationtime
            }
        }
        const createdBooking = await prisma.booking.create(mappedBooking);
        
        return createBooking
    } catch (error) {
        // console.eror(error);

        // throw new Error()
    }

};



module.exports = {
    getAllBooking,
    createBooking
};