import { BaseEntity } from 'src/common/base';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';
import { OnlineClass } from 'src/modules/online-classes/entities/online-class.entity';
import { Subject } from 'src/modules/subjects/entities/subject.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity({
  name: 'chapters',
})
export class Chapter extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true, default: null, type: 'text' })
  description: string;

  @Column({ nullable: true, default: null })
  image: string;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @JoinColumn({
    name: 'subject_id',
  })
  @ManyToOne(() => Subject, (subject) => subject.chapters)
  subject: Subject;

  @OneToMany(() => Topic, (topic) => topic.chapter)
  topics: Topic[];

  @OneToMany(() => Exercise, (exercise) => exercise.chapter)
  exercises: Exercise[];

  @OneToMany(() => OnlineClass, (onlineClass) => onlineClass.chapter)
  onlineClasses: OnlineClass[];
}
