import { Injectable } from '@nestjs/common'

@Injectable()
export class TodoService {
	create(name: string) {
		return {
			id: crypto.getRandomValues(new Uint32Array(1)),
			name,
		}
	}
}
