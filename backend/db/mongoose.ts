import mongoose from 'mongoose';
import 'dotenv/config';

const username = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const database = process.env.DATABASE_NAME
const url = process.env.MONGO_URL

const uri = `mongodb+srv://${username}:${password}@${url}/${database}?retryWrites=true`
try {
	mongoose
	.connect(uri)
	.then(
		() => {
			console.log('DB connected')
		});
} catch (error) {
	console.log('Could not connect db')
}

var db = mongoose.connection
