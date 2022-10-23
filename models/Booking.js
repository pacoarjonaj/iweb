import {Schema, model, models} from 'mongoose'

const bookingSchema = new Schema({
    startDate: {
		type: Date,
		required: [true, 'Start date is required']
	},
	endDate: {
		type : Date,
		required: [true, 'End date is required']
	},
	user: {
		type: Schema.Types.ObjectId, ref: 'User',
		required : [true, 'User is required']
	},
	housing: {
		type: Schema.Types.ObjectId, ref: 'Housing',
		required : [true, 'Housing is required']
	}
}, {
	timestamps: false,	// creo que es mejor quitar los createdAt/updateAt a no ser que los necesitemos, puede confundir un poco con el resto de atributos
	versionKey: false
})

export default models.Booking || model('Booking', bookingSchema)