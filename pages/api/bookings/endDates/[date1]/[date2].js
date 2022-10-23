import connectMongoDB from "../../../../../utils/mongoose"
import Booking from "../../../../../models/Booking"

connectMongoDB()

export default async (req, res) => {
	const {
		method,
		query: {date1, date2},
	} = req;

	switch(method){
		case 'GET':
			try{
				const booking = await Booking.find({endDate : { $gte :  date1, $lte : date2}})
				if(!booking) return res.status(404).json({msg: "Booking not found"})
				return res.status(200).json(booking)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
}

