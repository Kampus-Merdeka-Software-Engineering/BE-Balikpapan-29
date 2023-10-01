// const { prisma } = require('../config/prisma');


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function getAllBooking() {
    try {
        const booking = await prisma.booking.findMany();

        return booking;
    } catch (error) {
        console.error(error);

        throw new Error()
    }

};
async function createBooking(booking) {
    try {
        const mappedBooking = {
            data: {
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
        
        return createdBooking
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }

};


module.exports = {
    getAllBooking,
    createBooking
};