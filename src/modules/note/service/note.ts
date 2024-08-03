import { Init, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from "../../note/entity/note";
import { Body } from '@midwayjs/core';
/**
 * 描述
 */
@Provide()
export class NoteService extends BaseService {
  @InjectEntityModel(NoteEntity)
  NoteEntity: Repository<NoteEntity>;

  @Init()
  async init() {
    await super.init();
    this.setEntity(this.NoteEntity);
  }

  /**
   * 
   */
  async list(@Body() query) {
    const find = this.NoteEntity.createQueryBuilder()
    return find.select()
    // return this.entityRenderPage(find,query)
  }
}
