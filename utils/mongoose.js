import mongoose from 'mongoose'

const connectMongoDB = async() => {
	try{
		const {connection} = await mongoose.connect(process.env.MONGODB_URL)
		
		if(connection.readyState == 1) {
			console.log("MongoDB is connected")
		}
	
	}catch(err){
		return Promise.reject(err)
	}
}

export default connectMongoDB