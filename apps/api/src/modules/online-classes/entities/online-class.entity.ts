import { BaseEntity } from 'src/common/base';
import { Chapter } from 'src/modules/chapters/entities/chapter.entity';
import { Subject } from 'src/modules/subjects/entities/subject.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'online_classes',
})
export class OnlineClass extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'is_ended', default: false })
  isEnded: boolean;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @Column({ name: 'topic_id' })
  topicId: number;

  @JoinColumn({
    name: 'topic_id',
  })
  @ManyToOne(() => Topic, (topic) => topic.onlineClasses)
  topic: Topic;

  @Column({ name: 'chapter_id' })
  chapterId: number;

  @JoinColumn({
    name: 'chapter_id',
  })
  @ManyToOne(() => Chapter, (chapter) => chapter.onlineClasses)
  chapter: Chapter;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @JoinColumn({
    name: 'subject_id',
  })
  @ManyToOne(() => Subject, (subject) => subject.onlineClasses)
  subject: Subject;
}
