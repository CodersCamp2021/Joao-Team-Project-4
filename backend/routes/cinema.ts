import { Router } from 'express'
import { Types, Error } from 'mongoose'
import Cinema from '../model/Cinema'
import verifyToken from '../middleware/verifyToken'
import verifyRoles from '../middleware/verifyRoles'
import ROLES_LIST from '../config/roles_list'

import cors from 'cors'
import corsOptions from '../config/corsOptions'

const route = Router()

route.use(cors(corsOptions));

route.post('/cinema', cors(corsOptions), verifyToken, verifyRoles(ROLES_LIST.Admin), async (req, res) => {
	const cinema = new Cinema({
		country: req.body.country,
		city: req.body.city,
		adress: req.body.adress,
		openingHours: {
			monday: {
				start: req.body.openingHours.monday.start,
				end: req.body.openingHours.monday.end,
			},
			tuesday: {
				start: req.body.openingHours.tuesday.start,
				end: req.body.openingHours.tuesday.end,
			},
			wednesday: {
				start: req.body.openingHours.wednesday.start,
				end: req.body.openingHours.wednesday.end,
			},
			thursday: {
				start: req.body.openingHours.thursday.start,
				end: req.body.openingHours.thursday.end,
			},
			friday: {
				start: req.body.openingHours.friday.start,
				end: req.body.openingHours.friday.end,
			},
			saturday: {
				start: req.body.openingHours.saturday.start,
				end: req.body.openingHours.saturday.end,
			},
			sunday: {
				start: req.body.openingHours.sunday.start,
				end: req.body.openingHours.sunday.end,
			},
		},
	})

	try {
		const savedCinema = await cinema.save()
		return res.status(201).json({ savedCinema })
	} catch (e) {
		console.error('server error - /cinema POST', e)
		return res.status(500).send('Error saving the cinema.')
	}
})

route.get('/cinemas', async (req, res) => {
	Cinema.find({}, (err: Error, docs: typeof Cinema) => {
		if (err) {
			return res.status(500).send('server error - /cinemas GET')
		}
		return res.status(200).send(docs)
	})
})

route.put('/cinema', cors(corsOptions), verifyToken, verifyRoles(ROLES_LIST.Admin), async (req, res) => {
	Cinema.findByIdAndUpdate(
		req.body.id,
		{ ...req.body.newCinema },
		{ new: true },
		(err, docs) => {
			if (err) {
				return res
					.status(400)
					.send('server error while updating cinema - /cinema PUT')
			}
			return res.status(200).send(docs)
		}
	)
})

route.delete('/cinema/:id', cors(corsOptions), verifyToken, verifyRoles(ROLES_LIST.Admin), async (req, res) => {
	Cinema.findByIdAndDelete(
		new Types.ObjectId(req.params.id),
		(err: Error, docs: typeof Cinema) => {
			if (err) {
				console.error(err)
				return res
					.status(400)
					.send('server error while deleting cinema - /cinema DELETE')
			}
			return res.status(200).send(docs)
		}
	)
})

export default route
