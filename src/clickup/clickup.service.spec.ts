import { Test, TestingModule } from '@nestjs/testing'
import { ClickupService } from './clickup.service'

describe('ClickupService', () => {
	let service: ClickupService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ClickupService],
		}).compile()

		service = module.get<ClickupService>(ClickupService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
