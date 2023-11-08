import { BaseEntity } from 'src/common/base';
import { Chapter } from 'src/modules/chapters/entities/chapter.entity';
import { Mcq } from 'src/modules/mcqs/entities/mcq.entity';
import { Question } from 'src/modules/questions/entities/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity({
  name: 'exercises',
})
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({
    name: 'chapter_id',
  })
  chapterId: number;

  @JoinColumn({
    name: 'chapter_id',
  })
  @ManyToOne(() => Chapter, (chapter) => chapter.exercises)
  chapter: Chapter;

  @OneToMany(() => Question, (question) => question.exercise)
  questions: Question[];

  @OneToMany(() => Mcq, (question) => question.exercise)
  mcqs: Mcq[];
}
