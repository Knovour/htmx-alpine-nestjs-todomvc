import { Controller, Render, Get, Query, Post, Body } from '@nestjs/common'
import { ClickupService } from './clickup.service'
import { Init, Team, Space, Folder } from './clickup.interface'

@Controller('clickup')
export class ClickupController {
	constructor(private service: ClickupService) {}

	@Post()
	@Render('components/clickup.njk')
	async init(@Body() { token }: Init) {
		await this.service.init(token)
		const teams = await this.service.getTeams()
		const [spaces, tmpls] = await Promise.all([
			this.service.getSpaces(teams[0].id),
			this.service.getTaskTmpls(teams[0].id),
		])
		const folders = await this.service.getFolders(spaces[0].id)
		const lists = await this.service.getLists(folders[0].id)

		return { teams, spaces, folders, lists, tmpls }
	}

	@Get('space')
	@Render('components/multi-swap.njk')
	async space(@Query() { team: id }: Team) {
		const [spaces, tmpls] = await Promise.all([
			this.service.getSpaces(id),
			this.service.getTaskTmpls(id),
		])

		return { spaces, tmpls }
	}

	@Get('folder')
	@Render('components/options.njk')
	async folder(@Query() { space: id }: Space) {
		return { opts: await this.service.getFolders(id) }
	}

	@Get('list')
	@Render('components/options.njk')
	async list(@Query() { folder: id }: Folder) {
		return { opts: await this.service.getLists(id) }
	}
}
