import connectMongoDB from "../../../utils/mongoose"
import Housing from "../../../models/Housing"

connectMongoDB()

export default async (req, res) => {
	const {
		method,
		body,
		query: {id},
	} = req;

	switch(method){

		// http://localhost:3000/api/housings/[id]
		
		case 'GET':
			try{
				const housing = await Housing.findById(id)
				if(!housing) return res.status(404).json({msg: "Housing not found"})
				return res.status(200).json(housing)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		case 'PUT':
			try{
				const housing = await Housing.findByIdAndUpdate(id,body, {new:true})
				if(!housing) return res.status(404).json({msg: "Housing not found"})
				return res.status(200).json(housing)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		case 'DELETE':
			try{
				const deletedHousing = await Housing.findByIdAndDelete(id)
				if(!deletedHousing) return res.status(404).json({msg: "Housing not found"})
				return res.status(200).json()

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
}

