import {Request, Response} from 'express'
import {db} from '../db/db'

export const deleteVideoController = (req: Request, res: Response, ) => {
    db.videos=db.videos.filter(el => !(el.id === +req.params.id))
    console.log(db.videos)

    res.send(204)
}