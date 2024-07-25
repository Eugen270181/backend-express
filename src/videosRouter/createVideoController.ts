import {Response, Request} from 'express'
import {db} from '../db/db'
import {inputValidation} from "../input-output-types/validation-input-video-types";
import {InputVideoType, OutputVideoType} from "../input-output-types/video-types";
import {OutputErrorsType} from "../input-output-types/output-errors-type";


export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
        res.status(400).json(errors)
        return
    }
    // если всё ок - добавляем видео
    const Date1 = new Date()
    const Date2 = new Date( new Date().setDate(Date1.getDate()+1) )
    const newVideo: OutputVideoType = {
        id: Date.now() + Math.random(),
        title:req.body.title,
        author:req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null, //1..18 || null
        createdAt: Date1.toISOString(), 
        publicationDate: Date2.toISOString(),
        availableResolutions: typeof(req.body.availableResolutions)!=='undefined' ? req.body.availableResolutions : null
    }
    db.videos.push(newVideo)
    res.status(201).json(newVideo)
}