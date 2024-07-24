import {Response, Request} from 'express'
import {db} from '../db/db'
import {updateValidation} from "../input-output-types/validation-update-video-types";
import {Resolutions, UpdateVideoType} from "../input-output-types/video-types";
import {OutputErrorsType} from "../input-output-types/output-errors-type";


export const updateVideoController = (req: Request<any, any, UpdateVideoType>, res: Response<OutputErrorsType>) => {
    //поиск объекта - видео элемента в массиве db.videos
    const findVideo = db.videos.find(el => el.id === +req.params.id)
    if (!findVideo) {
        res.sendStatus(404)
        return
    }
    //если объект для обновления найден - проверяем валидность тела запроса объекта обновления
    const errors = updateValidation(req.body)
    if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
        res.status(400).send(errors)
        return
    }

    // если всё ок и найдено видео - обновляем свойства видео
    findVideo.author=req.body.author
    findVideo.title=req.body.title
    findVideo.availableResolutions=typeof(req.body.availableResolutions) !== 'undefined' ? req.body.availableResolutions : findVideo.availableResolutions
    findVideo.canBeDownloaded=typeof(req.body.canBeDownloaded) !== 'undefined' ? req.body.canBeDownloaded : findVideo.canBeDownloaded
    findVideo.minAgeRestriction=typeof(req.body.minAgeRestriction) !== 'undefined' ? req.body.minAgeRestriction : findVideo.minAgeRestriction
    findVideo.publicationDate=typeof(req.body.publicationDate) !== 'undefined' ? req.body.publicationDate : findVideo.publicationDate

    res.sendStatus(204)
}