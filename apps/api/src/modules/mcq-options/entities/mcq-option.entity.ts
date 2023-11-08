import { BaseEntity } from 'src/common/base';
import { Mcq } from 'src/modules/mcqs/entities/mcq.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'mcq_options',
})
export class McqOption extends BaseEntity {
  @Column()
  text: string;

  @Column({
    type: 'boolean',
    name: 'is_correct',
  })
  isCorrect: boolean;

  @Column({ type: 'text', name: 'detail_answer', default: null, nullable: true })
  detailAnswer?: string;

  @Column({ name: 'mcq_id' })
  mcqId: number;

  @JoinColumn({
    name: 'mcq_id',
  })
  @ManyToOne(() => Mcq, (mcq) => mcq.options ,{
    onDelete: 'CASCADE',
  })
  mcq: Mcq;
}
