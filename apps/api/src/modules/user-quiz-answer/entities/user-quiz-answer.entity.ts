import { BaseEntity } from 'src/common';
import { QuizMcqoption } from 'src/modules/quiz-mcqoptions/entities/quiz-mcqoption.entity';
import { UserQuiz } from 'src/modules/user-quiz/entities/user-quiz.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'user_quiz_answers' })
export class UserQuizAnswer extends BaseEntity {
  @Column({ name: 'user_quiz_id' })
  userQuizId: number;

  @JoinColumn({ name: 'user_quiz_id' })
  @ManyToOne(() => UserQuiz, (userQuiz) => userQuiz.answers, { onDelete: 'CASCADE' })
  userQuiz: UserQuiz;

  @Column({ name: 'selected_option_id' })
  selectedOptionId: number;

  @JoinColumn({ name: 'selected_option_id' })
  @ManyToOne(() => QuizMcqoption, (option) => option.id, { onDelete: 'CASCADE' })
  selectedOption: QuizMcqoption;

  @Column({ name: 'is_correct' })
  isCorrect: boolean;
}
