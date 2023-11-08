import { ViewEntity, ViewColumn, DataSource } from 'typeorm';
import { Topic } from './topic.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('topic.id', 'topicId')
      .addSelect('topic.name', 'topicName')
      .addSelect('c.id', 'chapterId')
      .addSelect('c.name', 'chapterName')
      .addSelect('s.id', 'subjectId')
      .addSelect('s.name', 'subjectName')
      .from(Topic, 'topic')
      .innerJoin('topic.chapter', 'c')
      .innerJoin('c.subject', 's'),
})
export class TopicView {
  @ViewColumn()
  topicId: number;

  @ViewColumn()
  topicName: string;

  @ViewColumn()
  chapterId: number;

  @ViewColumn()
  chapterName: string;

  @ViewColumn()
  subjectId: number;

  @ViewColumn()
  subjectName: string;
}
