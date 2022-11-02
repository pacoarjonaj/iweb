import connectMongoDB from "../../../../../utils/mongoose"
import User from "../../../../../models/User"

connectMongoDB()

export default async (req, res) => {
	const {
		method,
		query: {age1, age2},
	} = req;

	switch(method) {

		// http://localhost:3000/api/users/ages/[edad1]/[edad2]
		
		case 'GET':
			try{
				const user = await User.find({age : { $gte :  age1, $lte : age2}})
				if(!user) return res.status(404).json({msg: "User not found"})
				return res.status(200).json(user)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
}
