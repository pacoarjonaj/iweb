import connectMongoDB from "../../../utils/mongoose"
import { getBookings, postBooking } from "./controllerBooking"


export default async function handler(req,res){
	connectMongoDB().catch(() => res.status(405).json({error:"Error in the connection"}))

	//type of request
	const {method} = req

	switch(method){
		case 'GET':
			return getBookings(req,res)

		case 'POST':
			return postBooking(req,res)
			
		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
}