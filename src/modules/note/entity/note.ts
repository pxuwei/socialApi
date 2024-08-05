import {  } from '@cool-midway/core';
import { Column, Entity, Index,BaseEntity, PrimaryColumn } from 'typeorm';
/**
 * 描述
 */
@Entity('notes')
// @Entity()
export class NoteEntity extends BaseEntity {

  @PrimaryColumn({ comment: '纸条ID' })
  // @Column({ comment: '纸条ID' })
  id: number;

  @Column({ comment: '纸条内容' })
  noteContent: string;

  @Column({ comment: '纸条图片' })
  noteImgs: string;

  @Column({ comment: '纸条联系方式' })
  noteContact: string;

  @Column({ comment: '性别男1/女2' })
  noteType: number;

  @Column({ comment: '纸条状态0未抽/1已抽' })
  noteStatus: number;

  @Column({ comment: '审核时间' })
  auditTime: Date;

  @Column({ comment: '创建者ID' })
  createUserId: number;

  @Column({ comment: '创建时间' })
  createTime: Date;

  @Column({ comment: '删除状态1已删/0未删' })
  deleteStatus: number;



  @Column({ comment: '删除时间' })
  updateTime: Date;

  
  @Column({ comment: '抽取时间' })
  extractTime: Date;
  @Column({ comment: '抽取人' })
  extractUserId: number;
  
  
}
