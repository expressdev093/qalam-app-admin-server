import { DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Chapter } from './chapter.entity';
import { Subject } from 'src/modules/subjects/entities/subject.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('chapter.id', 'id')
      .addSelect('chapter.name', 'name')
      .addSelect('subject.name', 'subjectName')
      .from(Chapter, 'chapter')
      .leftJoin(Subject, 'subject', 'subject.id = chapter.subject_id'),
})
export class ChapterView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  subjectName: string;
}
