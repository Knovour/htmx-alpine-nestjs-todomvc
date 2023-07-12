import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { TodoController } from './todo/todo.controller'
import { TodoService } from './todo/todo.service'

@Module({
	imports: [],
	controllers: [AppController, TodoController],
	providers: [TodoService],
})
export class AppModule {}
