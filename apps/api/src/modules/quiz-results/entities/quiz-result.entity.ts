import { BaseEntity } from 'src/common/base';
import { Quiz } from 'src/modules/quizes/entities/quiz.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({
  name: 'quiz_results',
})
export class QuizResult extends BaseEntity {
  @Column()
  score: number;

  @Column()
  totalQuestions: number;

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
  @ManyToOne(() => User, (user) => user.quizResults)
  user: User;

  @JoinColumn({
    name: 'quiz_id',
  })
  @ManyToOne(() => Quiz, (quiz) => quiz.quizResults)
  quiz: Quiz;
}
