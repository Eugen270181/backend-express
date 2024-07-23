import {Response, Request} from 'express'
import {errorsMessagesType, OutputErrorsType} from '../input-output-types/output-errors-type'
import {db} from '../db/db'
import {InputVideoType, OutputVideoType, Resolutions} from '../input-output-types/video-types'

const pushToErrorObject = (Obj1: OutputErrorsType, message: string, field: string) => { //pushToErrorObject(errors,msg,field)
    const Obj2:errorsMessagesType = {message:"", field:""}
    Obj2.message=message
    Obj2.field=field
    return Obj1.errorsMessages.push(Obj2)
}

const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = { // объект для сбора ошибок
        errorsMessages: []
    }
    let msg = 'error!!!!'
    let field ='title'
// проверка наличия, а также валидности типа и значения обязательного свойства title
    if (video.title == null || !(typeof(video.title)==='string') || !video.title.length || video.title.length > 40){
        pushToErrorObject(errors,msg,field)
     }
// проверка наличия, а также валидности типа и значения обязательного свойства author
    field='author'
    if (video.author == null || !(typeof(video.author)==='string') || !video.author.length || video.author.length > 20){
        pushToErrorObject(errors,msg,field)
    }
// проверка валидности типа и значения необязательного свойства availableResolutions, если оно передано
    field='availableResolution'
    if ( !( video.availableResolutions == null //typeof(video.availableResolutions)==='undefined' || video.availableResolutions === null
        || ( Array.isArray(video.availableResolutions) && video.availableResolutions.length && video.availableResolutions.every(p => Resolutions[p]) ) )
    ){
        pushToErrorObject(errors,msg,field)
    }
    return errors
}

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
        availableResolutions: !(typeof(req.body.availableResolutions)==='undefined') ? req.body.availableResolutions : null
    }
    db.videos.push(newVideo)
    res.status(201).json(newVideo)
}