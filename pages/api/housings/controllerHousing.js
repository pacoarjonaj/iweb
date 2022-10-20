import Housing from "../../../models/Housing"

export async function getHousings(req,res){
	try{
		const housings = await Housing.find()
		return res.status(200).json(housings)

	}catch(error){
		return res.status(400).json({error: error.message })
	}
}


export async function postHousing(req,res){
	try{
		const newHousing = new Housing(req.body) 
		const savedHousing = await newHousing.save()
		return res.status(200).json(savedHousing)

	}catch(error){
		return res.status(400).json({error: error.message })
	}
}