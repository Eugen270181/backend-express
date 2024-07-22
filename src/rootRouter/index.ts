import {Router} from 'express'
export const rootRouter = Router()

rootRouter.get('/', (req, res) => {
    let messageWelcome: any = {version: '1.0'}; // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    messageWelcome = "hi, student!";
    res.status(200).json(messageWelcome);
})