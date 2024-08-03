import { CoolController, BaseController } from '@cool-midway/core';
import { NoteEntity } from '../../entity/note';
import { NoteService } from '../../service/note';
import { Get, Inject } from '@midwayjs/core';

/**
 * 纸条模块
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: NoteEntity,
  service:NoteService
})
export class NoteController extends BaseController {
@Inject()
NoteService:NoteService

    @Get('/list', { summary: '纸条列表' })
  async list(){
    return this.ok(this.NoteService.list({page: 1,
        size: 1,
        total: 2}))
  }
}
