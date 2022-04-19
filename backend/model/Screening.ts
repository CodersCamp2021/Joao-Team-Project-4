import { Schema, Document, model, Model, Types }  from "mongoose"

interface IScreening extends Document {
    cinemaId: Types.ObjectId,
    cinemaHallId: Types.ObjectId,
    movieId: Types.ObjectId,
    screeningDate: Date,
    reservedSeats: []
}

const ScreeningSchema : Schema = new Schema({
    cinemaId: {
        type: Types.ObjectId,
        required: true
    },
    cinemaHallId: {
        type: Types.ObjectId,
        required: true
    },
    movieId: {
        type: Types.ObjectId,
        required: true
    },
    screeningDate: {
        type: Date,
        required: true,
    },
    reservedSeats: {
        type: Array,
        required: true
    }
})

const Screening : Model<IScreening> = model('Screening', ScreeningSchema)

export default Screening