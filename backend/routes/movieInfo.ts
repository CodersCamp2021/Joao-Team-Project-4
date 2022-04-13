import * as express from 'express'
import * as mongoose from 'mongoose'
import Movie from '../model/Movie'
import cors from 'cors'
import corsOptions from '../config/corsOptions'

const router = express.Router()

router.get('/:id', cors(corsOptions), (req: express.Request, res: express.Response) => {
    const _id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(400).send("Invalid params");
        return;
    }

    Movie.findOne({ _id: _id }, (err: any, docs: any) => {
        if (err) {
            return res.status(500).send("server error - /movie GET")
        }
        return res.status(200).send(docs)
    });
});

export default router;
