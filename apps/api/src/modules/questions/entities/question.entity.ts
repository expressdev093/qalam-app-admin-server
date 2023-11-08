import { BaseEntity } from 'src/common/base';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { QuestionType } from '../enum/question-type.enum';

@Entity({
  name: 'questions',
})
export class Question extends BaseEntity {
  @Column()
  text: string;

  @Column({
    type: 'text',
  })
  answer: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @Column({ name: 'exercise_id' })
  exerciseId: number;

  @JoinColumn({
    name: 'exercise_id',
  })
  @ManyToOne(() => Exercise, (exercise) => exercise.questions, {
    onDelete: 'CASCADE',
  })
  exercise: Exercise;
}
