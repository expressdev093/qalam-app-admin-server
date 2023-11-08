import { BaseEntity } from 'src/common/base';
import { Chapter } from 'src/modules/chapters/entities/chapter.entity';
import { OnlineClass } from 'src/modules/online-classes/entities/online-class.entity';
import { Subject } from 'src/modules/subjects/entities/subject.entity';
import { TopicVideo } from 'src/modules/topic-videos/entities/topic-video.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity({
  name: 'topics',
})
export class Topic extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true, default: null, type: 'text' })
  description: string;

  @Column({ nullable: true, default: null })
  image: string;

  @Column({ name: 'chapter_id' })
  chapterId: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @JoinColumn({ name: 'chapter_id' })
  @ManyToOne(() => Chapter, (chapter) => chapter.topics)
  chapter: Chapter;

  @OneToMany(() => TopicVideo, (video) => video.topic)
  videos: TopicVideo[];

  @OneToMany(() => OnlineClass, (onlineClass) => onlineClass.topic)
  onlineClasses: OnlineClass[];

  @Column({ name: 'subject_id' })
  subjectId: number;

  @JoinColumn({ name: 'subject_id' })
  @ManyToOne(() => Subject, (subject) => subject.topics)
  subject: Subject;
}
