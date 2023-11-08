import { BaseEntity } from 'src/common/base';
import { Quiz } from 'src/modules/quizes/entities/quiz.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({
  name: 'quiz_attempts',
})
export class QuizAttempt extends BaseEntity {
  @Column({name: "started_at", type: 'datetime'})
  startedAt: Date;

  @Column({name: "completed_at", type: 'datetime', nullable: true, default: null})
  completedAt?: Date;

  @Column({nullable: true, default: 0})
  score: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @Column({
    name: 'quiz_id',
  })
  quizId: number;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User, (user) => user.quizAttempts)
  user: User;

  @JoinColumn({
    name: 'quiz_id',
  })
  @ManyToOne(() => Quiz, (quiz) => quiz.quizAttempts)
  quiz: Quiz;
}
