import * as express from 'express'
import Movie from '../model/Movie'
import cors from 'cors'

const router = express.Router()
const currentYear = new Date().getFullYear()  // returns the current year

router.get('/upcoming', cors(), async (req: express.Request, res: express.Response) => {
    const filter = { year: { $gte: currentYear } };
    const allUpcoming = await Movie.find(filter);

    res.send(allUpcoming);

})

export default router;
