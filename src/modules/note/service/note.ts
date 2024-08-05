import { Init, Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from "../../note/entity/note";
/**
 * 描述
 */
@Provide()
export class NoteService extends BaseService {
  @InjectEntityModel(NoteEntity)
  NoteEntity: Repository<NoteEntity>;

  // @Init()
  // async init() {
  //   await super.init();
  //   this.setEntity(this.NoteEntity);
  // }

  /**
   * 
   */
  async extract(query){
    
    const find = await this.NoteEntity.createQueryBuilder('notes')
    .select('notes.id')
    .addSelect('notes.noteImgs')
    .addSelect('notes.noteContact')
    .addSelect('notes.noteType')
    .addSelect('notes.noteStatus')
    .where('extractUserId IS NULL')
    .andWhere("deleteStatus = :deleteStatus", { deleteStatus: 0 })
    .andWhere("noteStatus = :noteStatus", { noteStatus: 0 })
    .limit(query.num)
    .getMany();
    try {
      if(find.length <= 0){
        return '没有数据'
      }
      let ids = []
      find.map(e=>{
        ids.push(e.id)
      })
     const extractFind =  await this.NoteEntity.createQueryBuilder()
     .update(NoteEntity)
     .set({
      extractUserId: 123,
      extractTime: new Date()
     })
     .where('id IN (:ids)', { ids: ids })
     .execute()
     if(extractFind.affected <= 0  ){
      return '抽取频繁'
     }
     return find

    } catch (error) {
      console.log('访问频繁',error);
      
      return '访问频繁'
    }
    
    // find.update(NoteEntity, { extractUserId: 1 }).setParameters({ extractUserId: 1 })
    // const result = await find.getOne()
    // const a = await this.NoteEntity.findOneBy({ noteId:10001 }).getOne();
    
    // return result 

    // return  await this.entityRenderPage(find,query)
  }
}
