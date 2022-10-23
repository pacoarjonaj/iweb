import Booking from "../../../models/Booking"

export async function getBookings(req, res){
	try{
		const bookings = await Booking.find()
		return res.status(200).json(bookings)

	}catch(error){
		return res.status(400).json({error: error.message })
	}
}


export async function postBooking(req, res){
	try{
		const newBooking = new Booking(req.body) 
		const savedBooking = await newBooking.save()
		return res.status(200).json(savedBooking)

	}catch(error){
		return res.status(400).json({error: error.message })
	}
}