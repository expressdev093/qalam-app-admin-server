import { BaseEntity } from 'src/common/base';
import { QuizMcq } from 'src/modules/quiz-mcqs/entities/quiz-mcq.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'quiz_mcq_options',
})
export class QuizMcqoption extends BaseEntity {
  @Column()
  text: string;

  @Column({ type: 'text', name: 'detail_answer', default: null, nullable: true })
  detailAnswer?: string;

  @Column({
    type: 'boolean',
    name: 'is_correct',
  })
  isCorrect: boolean;

  @Column({ name: 'quiz_mcq_id' })
  quizMcqId: number;

  @JoinColumn({
    name: 'quiz_mcq_id',
  })
  @ManyToOne(() => QuizMcq, (mcq) => mcq.options, {
    onDelete: 'CASCADE',
  })
  mcq: QuizMcq;
}
