import { BaseEntity } from 'src/common/base';
import { Subject } from 'src/modules/subjects/entities/subject.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({
  name: 'past_papers',
})
export class PastPaper extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true, default: null, type: 'text' })
  description: string;

  @Column({ nullable: true, default: null })
  url: string;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @Column({ name: 'year' })
  year: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @JoinColumn({
    name: 'subject_id',
  })
  @ManyToOne(() => Subject, (subject) => subject.papers)
  subject: Subject;


}
