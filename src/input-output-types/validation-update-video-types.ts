import {errorsMessagesType, OutputErrorsType} from './output-errors-type'
import {UpdateVideoType, Resolutions} from './video-types'

const pushToErrorObject = (Obj1: OutputErrorsType, msg: string, fld: keyof UpdateVideoType) => { //pushToErrorObject(errors,msg,field)
    const Obj2:errorsMessagesType = {message:"", field:""}
    Obj2.message=msg
    Obj2.field=fld
    return Obj1.errorsMessages.push(Obj2)
}

export const updateValidation = (video: UpdateVideoType) => {
    const errors: OutputErrorsType = { // объект для сбора ошибок
        errorsMessages: []
    }
    let msg:string = 'error!!!!'
    let field:keyof UpdateVideoType = "title"; let Field:any; let typeField:any
    let initField:keyof UpdateVideoType = (arg:keyof UpdateVideoType) => { Field = video[arg]; typeField = typeof(Field); return arg;}

    // @ts-ignore
    field=initField("title");
// проверка наличия, а также валидности типа и значения обязательного свойства title
    if (Field == null || !(typeField==='string') || !Field.length || Field.length > 40){
        pushToErrorObject(errors,msg,field)
    }
// проверка наличия, а также валидности типа и значения обязательного свойства author
    initField("author")
    if (video.author == null || !(typeof(video.author)==='string') || !video.author.length || video.author.length > 20){
        pushToErrorObject(errors,msg,field)
    }
// проверка валидности типа и значения необязательного свойства availableResolutions, если оно передано
    initField("availableResolutions")
    if ( !( video.availableResolutions == null //typeof(video.availableResolutions)==='undefined' || video.availableResolutions === null
        || ( Array.isArray(video.availableResolutions) && video.availableResolutions.length && video.availableResolutions.every(p => Resolutions[p]) ) )
    ){
        pushToErrorObject(errors,msg,field)
    }
// проверка валидности типа и значения необязательного свойства canBeDownloaded, если оно передано
    initField("canBeDownloaded")
    if (typeField!=='undefined'? typeField!=='boolean' : false) {
        pushToErrorObject(errors,msg,field)
    }
// проверка валидности типа и значения необязательного свойства canBeDownloaded, если оно передано



    return errors
}