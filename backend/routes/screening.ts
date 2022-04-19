import { Router } from 'express'
import { Types, Error } from 'mongoose'
import Screening from '../model/Screening'
import Movie from '../model/Movie'
import Cinema from '../model/Cinema'
import verifyToken from '../middleware/verifyToken'
import verifyRoles from '../middleware/verifyRoles'
import ROLES_LIST from '../config/roles_list'

import cors from 'cors'
import corsOptions from '../config/corsOptions'

const route = Router()

const startOfDay = (date: Date) => {
    return(new Date(date.getTime() - date.getTime() % (3600 * 1000 * 24)))
}

const endOfDay = (date: Date) => {
    return(new Date(date.getTime() - date.getTime() % (3600 * 1000 * 24) + 86399999))
}

const stringToTimeTouple = (string: string) => {
    return string.slice(0,-1).split("h").map(e=>(parseInt(e)))
}

const checkOverlapping = (a_start: Date, a_end: Date, b_start: Date, b_end: Date) => {
    if (a_start <= b_start && b_start <= a_end) return true
    if (a_start <= b_end   && b_end   <= a_end) return true
    if (b_start <=  a_start && a_end   <=  b_end) return true
    return false;
}

route.use(cors(corsOptions));

route.post('/screening', cors(corsOptions), 
verifyToken, verifyRoles(ROLES_LIST.Admin), 
async (req, res) => {

    const screening = await new Screening({
        cinemaId: req.body.cinemaId,
        cinemaHallId: req.body.cinemaHallId,
        movieId: req.body.movieId,
        screeningDate: req.body.screeningDate,
        reservedSeats: []
    })

    
    if(!Types.ObjectId.isValid(req.body.cinemaId)) {
        return res.status(400).send("Invalid cinema id")
    }
    
    if(!Types.ObjectId.isValid(req.body.cinemaHallId)) {
        return res.status(400).send("Invalid cinema hall id")
    }
    
    if(!Types.ObjectId.isValid(req.body.movieId)) {
        return res.status(400).send("Invalid movie id")
    }
    
    // Logic

    const movie = await Movie.findById(new Types.ObjectId(req.body.movieId))

    if(!movie) {
        return res.status(400).send("Movie not found")
    }

    const [screeningHours, screeningMinutes] = stringToTimeTouple(movie.length)
    const screeningStart = await new Date(req.body.screeningDate)
    const screeningEnd = await new Date(screeningStart.getTime() + screeningHours * 1000*60*60 + screeningMinutes * 1000*60 )

    const cinema = await Cinema.findById(new Types.ObjectId(req.body.cinemaId))

    if(!cinema) {
        return res.status(400).send("Cinema not found")
    }

    // Check if screening starts within cinema opening hours + boundaries
    
    if(screeningStart.getDay() == 1) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000)
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000)
        if(cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start")
        }
        if(screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end")
        }
    }

    if(screeningStart.getDay() == 2) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000)
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000)
        if(cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start")
        }
        if(screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end")
        }
    }

    if(screeningStart.getDay() == 3) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000)
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000)
        if(cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start")
        }
        if(screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end")
        }
    }

    if(screeningStart.getDay() == 4) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000)
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000)
        if(cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start")
        }
        if(screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end")
        }
    }

    if(screeningStart.getDay() == 5) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000)
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000)
        if(cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start")
        }
        if(screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end")
        }
    }

    if(screeningStart.getDay() == 6) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000)
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000)
        if(cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start")
        }
        if(screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end")
        }
    }

    if(screeningStart.getDay() == 0) {
        const cinemaOpen = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.start).getTime() + 900000)
        const cinemaClose = new Date(screeningStart.getTime() - screeningStart.getTime() % (3600 * 1000 * 24) + new Date(cinema.openingHours.monday.end).getTime() - 900000)
        if(cinemaOpen > screeningStart) {
            return res.status(400).send("Too early start")
        }
        if(screeningEnd > cinemaClose) {
            return res.status(400).send("Too late end")
        }
    }

    // Checking integration with other screenings

    const screenings = await Screening.find({
        cinemaHallId: new Types.ObjectId(req.body.cinemaHallId),
        screeningDate: {
            $gte: startOfDay(screeningStart),
            $lte: endOfDay(screeningStart)
        }
    })

    for(const _screening of screenings) {
        const _movie = await Movie.findById(new Types.ObjectId(_screening.movieId))
        
        if(!_movie) {
            return res.status(400).send("Movie not found")
        }

        const [_screeningHours, _screeningMinutes] = stringToTimeTouple(_movie.length)
        const _screeningStart = new Date(_screening.screeningDate)
        const _screeningEnd = new Date(_screeningStart.getTime() + _screeningHours * 1000*60*60 + _screeningMinutes * 1000*60 )
        
        // Check if there's break after screening
        const endDiff = screeningStart.getTime() - _screeningEnd.getTime()
        console.log(_movie.length)
        if(endDiff > 0 && endDiff < 900000) {
            return res.status(400).send("Bad request - there has to be a 15 minute break before next screening")
        }
        
        //Check if screenings overlap
        if(checkOverlapping(screeningStart, screeningEnd, _screeningStart, _screeningEnd)) {
            return res.status(400).send("Bad request - screening overlaps with another screening")
        }
    }

    try {
        const savedScreening = await screening.save()
        return res.status(201).json({savedScreening})
    } catch (e) {
        console.error('server error - /screening POST')
        return res.status(500).send('Error while saving cinema hall.')
    }
})

route.delete('/screening/:screeningId', cors(corsOptions), 
verifyToken, verifyRoles(ROLES_LIST.Admin), 
async (req, res) => {
    Screening.findByIdAndDelete(
		new Types.ObjectId(req.params.screeningId),
		(err: Error, docs: typeof Screening) => {
			if (err) {
				console.error(err)
				return res
					.status(500)
					.send('server error while deleting screening - /screening DELETE')
			}
			return res.status(200).send(docs)
		}
	)
})

route.get('/screenings/hall/:cinemaHallId/:screeningDate', cors(corsOptions),
async (req, res) => {
    const day = new Date(req.params.screeningDate)

    Screening.find({
		    cinemaHallId: new Types.ObjectId(req.params.cinemaHallId),
            screeningDate: {
                $gte: startOfDay(day), 
                $lte: endOfDay(day)
            }
        },
        null,
        {sort: {screeningDate: 1}},
		(err, docs) => {
			if (err) {
				console.error(err)
				return res
					.status(500)
					.send('server error while fetching screenings - /screenings/hall GET')
			}
			return res.status(200).send(docs)
		}
	)
})

route.get('/screenings/movie/:movieId', cors(corsOptions), 
async (req, res) => {
    Screening.find({
		    movieId: new Types.ObjectId(req.params.movieId),
        },
		(err: Error, docs: typeof Screening) => {
			if (err) {
				console.error(err)
				return res
					.status(500)
					.send('server error while fetching screenings - /screenings/movie GET')
			}
			return res.status(200).send(docs)
		}
	)
})

export default route
