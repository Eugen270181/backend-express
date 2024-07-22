import {Router} from "express";
import {SETTINGS} from './settings'
import {videosRouter} from './videosRouter'
import {testingRouter} from './testingRouter'
import {rootRouter} from './rootRouter'

export const mainRouter = Router()

mainRouter.use('/', rootRouter);
mainRouter.use(SETTINGS.PATH.VIDEOS, videosRouter);
mainRouter.use(SETTINGS.PATH.TESTING, testingRouter);