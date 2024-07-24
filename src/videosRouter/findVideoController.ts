import {Request, Response} from 'express'
import {db} from '../db/db'

export const findVideoController = (req: Request, res: Response, ) => {
    const findVideo = db.videos.find(el => el.id === +req.params.id)

    if (findVideo) {
        res.status(200).send(findVideo)
    }
    else {
        res.send(404)
    }


}