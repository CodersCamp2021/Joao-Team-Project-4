import * as cors from 'cors';
import allowedOrigins from './allowedOrigins'

const customOrigin = (
	requestOrigin: string | undefined,
	callback: (err: Error | null, origin?: boolean) => void
): void => {

	if (!requestOrigin || allowedOrigins.indexOf(requestOrigin) !== -1) {
		callback(null, true)
	} else {
		callback(new Error('Not allowed by CORS'))
	}
}

const corsOptions: cors.CorsOptions = {
  origin: customOrigin,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

export default corsOptions;
