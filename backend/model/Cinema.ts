import { Schema, Document, model, Model }  from "mongoose"

interface ICinema extends Document {
    country: string,
    city: string,
    adress: string,
    openingHours: {
        monday: {
            start: Date,
            end: Date
        },
        tuesday: {
            start: Date,
            end: Date
        },
        wednesday: {
            start: Date,
            end: Date
        },
        thursday: {
            start: Date,
            end: Date
        },
        friday: {
            start: Date,
            end: Date
        },
        saturday: {
            start: Date,
            end: Date
        },
        sunday: {
            start: Date,
            end: Date
        },
    }
}

const CinemaSchema : Schema = new Schema({
    country: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    city: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    adress: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    openingHours: {
        monday: {
            start: { type: Date },
            end: { type: Date }
        },
        tuesday: {
            start: { type: Date },
            end: { type: Date }
        },
        wednesday: {
            start: { type: Date },
            end: { type: Date }
        },
        thursday: {
            start: { type: Date },
            end: { type: Date }
        },
        friday: {
            start: { type: Date },
            end: { type: Date }
        },
        saturday: {
            start: { type: Date },
            end: { type: Date }
        },
        sunday: {
            start: { type: Date },
            end: { type: Date }
        },
    }
})

const Cinema: Model<ICinema> = model('Cinema', CinemaSchema)

export default Cinema