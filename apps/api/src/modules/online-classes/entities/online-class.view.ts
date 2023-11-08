import { Column, DataSource, ViewColumn, ViewEntity } from 'typeorm';

import { OnlineClass } from './online-class.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { Chapter } from 'src/modules/chapters/entities/chapter.entity';
import { Subject } from 'src/modules/subjects/entities/subject.entity';
import { BaseEntity } from 'src/common';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('O.*')
      .addSelect('C.name', 'chapter_name')
      .addSelect('S.name', 'subject_name')
      .addSelect('T.name', 'topic_name')
      .from(OnlineClass, 'O')
      .innerJoin(Topic, 'T', 'T.id = O.topic_id')
      .innerJoin(Chapter, 'C', 'C.id = O.chapter_id')
      .innerJoin(Subject, 'S', 'S.id = O.subject_id')
      .where('O.is_ended=0'),
})
export class OnlineClassView extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'is_ended' })
  isEnded: boolean;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'topic_id' })
  topicId: number;

  @Column({ name: 'chapter_id' })
  chapterId: number;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @Column({ name: 'subject_name' })
  subjectName: number;

  @Column({ name: 'chapter_name' })
  chapterName: number;

  @Column({ name: 'topic_name' })
  topicName: number;
}
