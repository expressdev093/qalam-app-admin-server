// src/entities/Test.entity.ts
import { BaseEntity } from 'src/common/base';
import { QuizAttempt } from 'src/modules/quiz-attempts/entities/quiz-attempts.entity';
import { QuizMcq } from 'src/modules/quiz-mcqs/entities/quiz-mcq.entity';
import { QuizResult } from 'src/modules/quiz-results/entities/quiz-result.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { QuizType } from '../enum/quiz-type.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { UserQuiz } from 'src/modules/user-quiz/entities/user-quiz.entity';

@Entity({ name: 'quizes' })
export class Quiz extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true, default: null })
  description?: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'passing_score' })
  passingScore: number;

  @OneToMany(() => QuizMcq, (quizMcq) => quizMcq.quiz)
  mcqs: QuizMcq[];

  @Column({
    type: 'enum',
    enum: QuizType,
  })
  type: QuizType;

  @Column({
    nullable: true,
    name: 'entity_id',
  })
  entityId?: number;

  @OneToMany(() => QuizResult, (quizResult) => quizResult.quiz)
  quizResults: QuizResult[];

  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.quiz)
  quizAttempts: QuizAttempt[];

  @Column({ name: 'total_time', default: 0 })
  totalTime: number;

  @OneToMany(() => UserQuiz, (userQuiz) => userQuiz.quiz)
  userQuizzes: UserQuiz[];
}
