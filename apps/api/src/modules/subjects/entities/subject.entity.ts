import { BaseEntity } from 'src/common/base';
import { Chapter } from 'src/modules/chapters/entities/chapter.entity';
import { OnlineClass } from 'src/modules/online-classes/entities/online-class.entity';
import { PastPaper } from 'src/modules/past-papers/entities/past-papers.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({
  name: 'subjects',
})
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: null, type: 'text' })
  description: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ nullable: true, default: null })
  image: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  color: string;

  @OneToMany(() => Chapter, (chapter) => chapter.subject)
  chapters: Chapter[];

  @OneToMany(() => OnlineClass, (onlineClass) => onlineClass.subject)
  onlineClasses: OnlineClass[];

  @OneToMany(() => Topic, (topic) => topic.subject)
  topics: Topic[];

  @OneToMany(() => PastPaper, (pastPaper) => pastPaper.subject)
  papers: PastPaper[];
}
