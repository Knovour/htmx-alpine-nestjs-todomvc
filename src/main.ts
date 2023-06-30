import { NestFactory } from '@nestjs/core'
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

	app.useStaticAssets({
		root: join(__dirname, '..', 'public'),
		prefix: '/public/',
	})

	app.setViewEngine({
		engine: { nunjucks: require('nunjucks') },
		templates: join(__dirname, '..', 'views'),
		options: { noCache: true },
	})

	await app.listen(3000)
}

bootstrap()
