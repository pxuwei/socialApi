import { CoolController, BaseController } from '@cool-midway/core';
import { NoteEntity } from '../../entity/note';
import { NoteService } from '../../service/note';
import { Get, Inject, Post } from '@midwayjs/core';
import { Body, Query } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
/**
 * 纸条模块
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: NoteEntity,
  service:NoteService,
  pageQueryOp:{
    // select:['id','noteContent','noteImgs','noteContact','noteType','noteStatus'],
    where:async (ctx)=>{
      const { a } = ctx.request.body;
      return [
        ["a.deleteStatus = :deleteStatus", { deleteStatus: 0 }],
        ["a.noteStatus = :noteStatus", { noteStatus: 0 }]

      ]
    },
    addOrderBy: {
      id: "ASC",
    },
  },
  // infoIgnoreProperty:['createUserId','updateUserId','createTime','updateTime','extractUserId','extractTime','auditTime','deleteStatus'],


})
export class NoteController extends BaseController {
  @InjectEntityModel(NoteService)
  NoteEntity: Repository<NoteEntity>;

@Inject()
NoteService:NoteService

    @Post('/extract', { summary: '抽取纸条' })
  // async list(@Body() query){
  async extract(@Body() query) {
    const result = await this.NoteService.extract(query)
    // const result = await this.NoteService.list()
    console.log('res',result);
    
    return this.ok(result)
  }
}

