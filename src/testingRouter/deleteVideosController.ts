import {Request, Response} from 'express'
import {db} from '../db/db'

export const deleteVideosController = (req: Request, res: Response<any /*OutputVideoType[]*/>) => {
    const videos = db.videos // получаем видео из базы данных

    res
        .status(200)
        .json("deleting all videos....") // отдаём видео в качестве ответа
}

// не забудьте добавить эндпоинт в апп