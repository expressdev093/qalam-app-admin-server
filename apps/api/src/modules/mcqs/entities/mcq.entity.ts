import { BaseEntity } from 'src/common/base';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';
import { McqOption } from 'src/modules/mcq-options/entities/mcq-option.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'mcqs',
})
export class Mcq extends BaseEntity {
  @Column()
  text: string;

  @Column({ name: 'exercise_id' })
  exerciseId: number;

  @JoinColumn({
    name: 'exercise_id',
  })
  @ManyToOne(() => Exercise, (exercise) => exercise.mcqs, {
    onDelete: 'CASCADE',
  })
  exercise: Exercise;

  @OneToMany(() => McqOption, (option) => option.mcq)
  options: McqOption[];
}
