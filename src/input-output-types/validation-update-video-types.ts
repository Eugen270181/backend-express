import {errorsMessagesType, OutputErrorsType} from './output-errors-type'
import {UpdateVideoType, Resolutions} from './video-types'

const pushToErrorObject = (Obj1: OutputErrorsType, msg: string, field: keyof UpdateVideoType) => { //pushToErrorObject(errors,msg,field)
    const Obj2:errorsMessagesType = {message:"", field:""}
    Obj2.message=msg
    Obj2.field=field
    return Obj1.errorsMessages.push(Obj2)
}

export const updateValidation = (video: UpdateVideoType) => {
    const errors: OutputErrorsType = { // объект для сбора ошибок
        errorsMessages: []
    }
    let msg:string = "error!!!!"
    let field:keyof UpdateVideoType; let Field:any; let typeField:any
    const initField = (arg:keyof UpdateVideoType) => { Field = video[arg]; typeField = typeof(Field);}

    field="title"; initField(field);
// проверка наличия, а также валидности типа и значения обязательного свойства title
    if (Field == null || !(typeField==='string') || !Field.length || Field.length > 40){
        pushToErrorObject(errors,msg,field)
    }

    field="author"; initField(field);
// проверка наличия, а также валидности типа и значения обязательного свойства author
    if (Field == null || !(typeField==='string') || !Field.length || Field.length > 20){
        pushToErrorObject(errors,msg,field)
    }

    field="availableResolutions"; initField(field);
// проверка валидности типа и значения необязательного свойства availableResolutions, если оно передано
    if ( !( Field == null || ( Array.isArray(Field) && Field.length && Field.every((p:Resolutions) => Resolutions[p]) ) ) ){
        pushToErrorObject(errors,msg,field)
    }

    field="canBeDownloaded"; initField(field);
// проверка валидности типа и значения необязательного свойства canBeDownloaded, если оно передано
    if (typeField!=='undefined'? typeField!=='boolean' : false) {
        pushToErrorObject(errors,msg,field)
    }

    field="minAgeRestriction"; initField(field);
// проверка валидности типа и значения необязательного свойства minAgeRestriction, если оно передано
    if ( !( Field==null || ( typeField==='number' && 1 <= Field && Field <= 18 ) ) ) {
        pushToErrorObject(errors,msg,field)
    }

    field="publicationDate"; initField(field);
// проверка валидности типа и значения необязательного свойства publicationDate, если оно передано
    if (typeField!=='undefined'? !( typeField==='string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z?$/.test(Field) ): false) {
        pushToErrorObject(errors,msg,field)
    }

    return errors
}