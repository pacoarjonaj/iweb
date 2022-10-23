import {Schema, model, models} from 'mongoose'

const housingSchema = new Schema({
	title:{
		type:String,
		required: [true, 'Title is required'],
		unique: true,
		trim: true
	},
	address: {
		type: String,
		required : [true, 'Address is required']
	},
	description: {
		type : String,
		maxLength : [100, 'Description must be less than 100 characters']
	},
	price: {
		type: Number,
		required : [true, 'Price is required']
	},
	owner: {
		type: Schema.Types.ObjectId, ref: 'User',
		required : [true, 'Owner is required']
	}
}, {
	timestamps: true,	// mongoose guarda cuando se crea o se actualiza algun usuario, createdAt/updateAt
	versionKey: false
})

export default models.Housing || model('Housing',housingSchema)