import { BaseEntity } from 'src/common/base';
import { QuizMcqoption } from 'src/modules/quiz-mcqoptions/entities/quiz-mcqoption.entity';
import { Quiz } from 'src/modules/quizes/entities/quiz.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'quiz_mcqs',
})
export class QuizMcq extends BaseEntity {
  @Column()
  text: string;

  @Column({ name: 'quiz_id' })
  quizId: number;

  @JoinColumn({
    name: 'quiz_id',
  })
  @ManyToOne(() => Quiz, (quiz) => quiz.mcqs, {
    onDelete: 'CASCADE',
  })
  quiz: Quiz;

  @OneToMany(() => QuizMcqoption, (option) => option.mcq)
  options: QuizMcqoption[];
}
