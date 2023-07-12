import { Controller, Render, Post, Patch, Put, Delete, Body, Param } from '@nestjs/common'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
	constructor(private service: TodoService) {}

	@Post('/create')
	@Render('swap/task.njk')
	async create(@Body() { name }) {
		const task = this.service.create(name)
		console.log(`Add: ${task.id} - ${task.name}`)

		return task
	}

	@Patch('/:id/update')
	async update(@Param() { id }, @Body() { newName }) {
		console.log(`Update: ${id} - ${newName}`)

		return newName
	}

	@Patch('/:id/toggle')
	async toggle(@Param() { id }, @Body() { completed }) {
		console.log(`${completed ? 'Completed' : 'Reset'}: ${id}`)
	}

	@Put('/toggle')
	async toggleAll(@Body() { completedId }) {
		completedId ? console.log(`Completed: ${completedId}`) : console.log(`Reset all`)
	}

	@Delete('/:id/del')
	async del(@Param() { id }) {
		console.log(`Delete: ${id}`)
	}

	@Delete('/del')
	async delAll(@Body() { completedId }) {
		console.log(`Clear: ${completedId}`)
	}
}
