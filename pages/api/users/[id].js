import connectMongoDB from "../../../utils/mongoose"
import User from "../../../models/User"

connectMongoDB()

export default async (req, res) => {
	const {
		method,
		body,
		query: {id},
	} = req;

	switch(method) {

		// http://localhost:3000/api/users/[id]
		
		case 'GET':
			try{
				const user = await User.findById(id)
				if(!user) return res.status(404).json({msg: "User not found"})
				return res.status(200).json(user)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		case 'PUT':
			try{
				const user = await User.findByIdAndUpdate(id, body, {new: true})
				if (!user) return res.status(404).json({msg: "User not found"})
				return res.status(202).json(user)

			}catch(error){
				return res.status(500).json({msg: "This method is not supported"})
			}

		case 'DELETE':
			try{
				const deletedUser = await User.findByIdAndDelete(id)
				if (!deletedUser) return res.status(404).json({msg: "User not found"})
				return res.status(202).json()

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
}
