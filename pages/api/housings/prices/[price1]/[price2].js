import connectMongoDB from "../../../../../utils/mongoose"
import Housing from "../../../../../models/Housing"

connectMongoDB()

export default async (req, res) => {
	const {
		method,
		query: {price1, price2},
	} = req;

	switch(method){

		// http://localhost:3000/api/housings/prices/[precio1]/[precio2]
		
		case 'GET':
			try{
				const housing = await Housing.find({price : { $gte :  price1, $lte : price2}})
				if(!housing) return res.status(404).json({msg: "Housing not found"})
				return res.status(200).json(housing)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
}

