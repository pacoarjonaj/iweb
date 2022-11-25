import {Schema, model, models} from 'mongoose'

const housingSchema = new Schema({
	title:{
		type:String,
		required: [true, 'Title is required'],
		unique: true,
		trim: true
	},
	description: {
		type : String,
		required: [true, 'Description is required'],
	},
	location: {
		type: String,
		required : [true, 'Location is required']
	},
	address: {
		type: String,
		required : [true, 'Address is required']
	},
	price: {
		type: String,
		required : [true, 'Price is required']
	},
	owner: {
		type: Schema.Types.ObjectId, ref: 'User',
		required : [true, 'Owner is required']
	}
}, {
	timestamps: false,
	versionKey: false
})

export default models.Housing || model('Housing',housingSchema)