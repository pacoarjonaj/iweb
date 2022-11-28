import {Schema, model, models} from 'mongoose'

const housingSchema = new Schema({
	title:{
		type:String,
		required: [true, 'Title is required'],
		trim: true
	},
	description: {
		type : String,
		required: [true, 'Description is required'],
	},
	address: {
		type: String,
		required : [true, 'Address is required']
	},
	price: {
		type: Number,
		required : [true, 'Price is required']
	},
	owner: {
		type: Schema.Types.ObjectId, ref: 'User',
		required : [true, 'Owner is required']
	},
	lat: {
		type: Number,
		required : [true, 'Latitude is required']
	},
	lng: {
		type: Number,
		required : [true, 'Longitude is required']
	},
	public_id: {
		type: String
	}
}, {
	timestamps: false,
	versionKey: false
})

export default models.Housing || model('Housing',housingSchema)