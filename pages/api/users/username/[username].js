import connectMongoDB from "../../../../utils/mongoose"
import User from "../../../../models/User"

connectMongoDB()

export default async (req, res) => {
	const {
		method,
		query: {username},
	} = req;

	switch(method) {
		case 'GET':
			try{
				const user = await User.find({username: new RegExp(username, 'i')})
				if(!user) return res.status(404).json({msg: "User not found"})
				return res.status(200).json(user)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
}
