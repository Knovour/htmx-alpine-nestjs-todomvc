import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { HttpModule } from '@nestjs/axios'
import { AppController } from './app.controller'
import { ClickupController } from './clickup/clickup.controller'
import { ClickupService } from './clickup/clickup.service'

@Module({
	imports: [
		HttpModule,
		CacheModule.register({
			ttl: 1000 * 60 * 60, // 一小時
			isGlobal: true,
		}),
	],
	controllers: [AppController, ClickupController],
	providers: [ClickupService],
})
export class AppModule {}
