import connectMongoDB from "../../../utils/mongoose"
import Booking from "../../../models/Booking"

connectMongoDB()

export default async (req, res) => {
	const {
		method,
		body,
		query: {id},
	} = req;

	switch(method){

		// http://localhost:3000/api/bookings/[id]
		
		case 'GET':
			try{
				const booking = await Booking.findById(id)
				if(!booking) return res.status(404).json({msg: "Booking not found"})
				return res.status(200).json(booking)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		case 'PUT':
			try{
				const booking = await Booking.findByIdAndUpdate(id, body, {new: true})
				if(!booking) return res.status(404).json({msg: "Booking not found"})
				return res.status(200).json(booking)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		case 'DELETE':
			try{
				const deletedBooking = await Booking.findByIdAndDelete(id)
				if(!deletedBooking) return res.status(404).json({msg: "Booking not found"})
				return res.status(200).json()

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
}

