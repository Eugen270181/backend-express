import {Request, Response} from 'express'
import {db} from '../db/db'

export const deleteVideosController = (req: Request, res: Response) => {
    db.videos = []
    console.log('All data is deleted');
    res.status(204).json("All data is deleted")
}

// не забудьте добавить эндпоинт в апп