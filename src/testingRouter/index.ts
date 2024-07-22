import {Router} from 'express'
import {deleteVideosController} from './deleteVideosController'
export const testingRouter = Router()

testingRouter.delete('/', deleteVideosController)
testingRouter.get('/', deleteVideosController)

