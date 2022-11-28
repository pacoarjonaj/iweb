import {Schema, model, models} from 'mongoose'

const userSchema = new Schema({
	name: {
		type: String,
		required : [true, 'Name is required'],
	},
	surname: {
		type: String
	},
	email: {
		type: String,
		required : [true, 'email is required'],
		trim: true
	},
	username: {
		type: String,
		required : [true, 'Username is required'],
		unique: true,
		trim: true
	},
	age: {
		type: Number,
		required : [true, 'Age is required'],
	},
	public_id: {
		type: String
	}
}, {
	timestamps: false,	// mongoose guarda cuando se crea o se actualiza algun usuario, createdAt/updateAt
	versionKey: false
})

export default models.User || model('User', userSchema)