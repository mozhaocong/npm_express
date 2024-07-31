import express, { Express, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import * as core from 'express-serve-static-core'

const PORT = 3080
const app: Express = express()

function expressInit(item: { router?: core.Router; middleware?: Array<(req?, res?, next?) => void> }) {
	const { router, middleware } = item
	//开启 cors
	app.use(cors())
	//支持  application/json类型 发送数据 设置请求体大小限制为10MB
	app.use(json({ limit: '100mb' }))
	// 支持 application/x-www-form-urlencoded 发送数据
	app.use(urlencoded({ extended: false }))

	//日志中间件
	app.use(morgan('dev'))

	// app.get('/', (req: Request, res: Response, next: NextFunction) => {
	// 	res.json({
	// 		code: 0,
	// 		message: 'success'
	// 	})
	// })

	// 插入中间件
	if (middleware) {
		middleware.forEach((forItem) => {
			app.use(forItem)
		})
	}
	if (router) {
		app.use('/', router)
	}

	app.listen(PORT, () => {
		console.log(`服务已经启动:http://localhost:${PORT}`)
	})
}

export default expressInit

// const handleResponse = (req, res, next) => {
// 	console.log('handleResponse handleResponse handleResponse')
// 	// const originalSend = res.send
// 	// res.send = function (data) {
// 	// 	// 在发送响应之前可以在此进行任何处理
// 	// 	// 例如，添加统一的头部信息
// 	// 	res.setHeader('Content-Type', 'application/json')
// 	//
// 	// 	// 调用原始的 res.send 方法发送响应
// 	// 	originalSend.call(this, data)
// 	// }
// 	// 继续 Express 中间件链
// 	next()
// }
//
// const middleware = [handleResponse]
//
// expressInit({ router, middleware })
