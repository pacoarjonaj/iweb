import connectMongoDB from "../../../../utils/mongoose"
import Housing from "../../../../models/Housing"

connectMongoDB()

export default async (req, res) => {
	const {
		method,
		query: {address},
	} = req;

	switch(method){
		case 'GET':
			try{
				const housing = await Housing.find({address: new RegExp(address, 'i')})
				if(!housing) return res.status(404).json({msg: "Housing not found"})
				return res.status(200).json(housing)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
}

