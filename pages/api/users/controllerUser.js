import User from "../../../models/User"


export async function getUsers(req,res){
	try{
		const users = await User.find()
	 	return res.status(200).json(users)

	}catch(error){
		return res.status(400).json({error: error.message })
	}
}


export async function postUser(req,res){
	try{
		const newUser = new User(req.body)
		const savedUser = await newUser.save()
		return res.status(201).json(savedUser)

	}catch(error){
		return res.status(400).json({error: error.message })
	}
}
