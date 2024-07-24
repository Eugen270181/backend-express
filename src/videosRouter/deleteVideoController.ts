import {Request, Response} from 'express'
import {db} from '../db/db'

export const deleteVideoController = (req: Request, res: Response, ) => {
    let newDbVideos= db.videos.filter(el => !(el.id === +req.params.id))

    if (newDbVideos.length !== db.videos.length) {
        db.videos = newDbVideos
        res.sendStatus(204)
    }
    else {
        res.sendStatus(404)
    }

}