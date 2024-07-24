import {errorsMessagesType, OutputErrorsType} from './output-errors-type'
import {InputVideoType, Resolutions} from './video-types'

const pushToErrorObject = (Obj1: OutputErrorsType, message: string, field: string) => { //pushToErrorObject(errors,msg,field)
    const Obj2:errorsMessagesType = {message:"", field:""}
    Obj2.message=message
    Obj2.field=field
    return Obj1.errorsMessages.push(Obj2)
}

export const inputValidation = (video: InputVideoType) => {
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
    field='availableResolutions'
    if ( !( video.availableResolutions == null //typeof(video.availableResolutions)==='undefined' || video.availableResolutions === null
        || ( Array.isArray(video.availableResolutions) && video.availableResolutions.length && video.availableResolutions.every(p => Resolutions[p]) ) )
    ){
        pushToErrorObject(errors,msg,field)
    }

    return errors
}