import allowedOrigins from './allowedOrigins'

const corsOptions = {
	origin: (
		origin: string,
		callback: (arg0: Error | null, arg1?: boolean | undefined) => void
	): void => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionsSuccessStatus: 200,
}


export default corsOptions;

