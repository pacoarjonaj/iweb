import connectMongoDB from "../../../../utils/mongoose"
import User from "../../../../models/User"
import Booking from "../../../../models/Booking"

connectMongoDB()

export default async (req, res) => {
	const {
		method,
		query: {booker},
	} = req;

	switch(method){
		case 'GET':
			try{
                const user = await User.find({username: new RegExp(booker, 'i')})
				if(!user) return res.status(404).json({msg: "User not found"})
				var firstUser = ((user[0]["_id"]).valueOf())

				const booking = await Booking.find({user: firstUser})
				if(!booking) return res.status(404).json({msg: "Booking not found"})
				return res.status(200).json(booking)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
}

