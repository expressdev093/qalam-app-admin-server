import { BaseEntity } from 'src/common';
import { Quiz } from 'src/modules/quizes/entities/quiz.entity';
import { UserQuizAnswer } from 'src/modules/user-quiz-answer/entities/user-quiz-answer.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user_quizzes' })
export class UserQuiz extends BaseEntity {
  @Column({ name: 'is_completed', default: false })
  isCompleted: boolean;

  @Column({ name: 'passing_score', default: 0 })
  passingScore: number;

  @Column({ name: 'total_score', default: 0 })
  totalScore: number;

  @Column({ name: 'correct_answer', default: 0 })
  correctAnswers: number;

  @Column({ name: 'incorrect_answers', default: 0 })
  inCorrectAnswers: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'quiz_id' })
  quizId: number;

  @ManyToOne(() => User, (user) => user.userQuizzes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.userQuizzes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @OneToMany(() => UserQuizAnswer, (answer) => answer.userQuiz)
  answers: UserQuizAnswer[];
}
