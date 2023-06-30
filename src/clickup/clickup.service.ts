import { Injectable, Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpService } from '@nestjs/axios'
import { Cache } from 'cache-manager'

@Injectable()
export class ClickupService {
	constructor(private readonly http: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

	async init(token: string) {
		await this.cacheManager.set('token', token)
	}

	async getTeams() {
		return await this._fetchData('https://api.clickup.com/api/v2/team', 'teams')
	}

	async getSpaces(teamId: string) {
		return await this._fetchData(`https://api.clickup.com/api/v2/team/${teamId}/space?archived=false`, 'spaces')
	}

	async getFolders(spaceId: string) {
		return await this._fetchData(`https://api.clickup.com/api/v2/space/${spaceId}/folder?archived=false`, 'folders')
	}

	async getLists(folderId: string) {
		return await this._fetchData(`https://api.clickup.com/api/v2/folder/${folderId}/list?archived=false`, 'lists')
	}

	async getTaskTmpls(teamId: string) {
		return await this._fetchData(`https://api.clickup.com/api/v2/team/${teamId}/taskTemplate?page=0`, 'templates')
	}

	async _fetchData(path, name) {
		const token: string = await this.cacheManager.get('token')
		const res = await this.http.axiosRef.get(path, {
			headers: { Authorization: token },
		})

		return res.data[name].map(({ id, name }) => ({ id, name }))
	}
}
