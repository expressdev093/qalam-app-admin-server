import { BaseEntity } from 'src/common';
import { Board } from 'src/modules/boards/entities/board.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
  name: 'board_classes',
})
export class BoardClass extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'board_id' })
  boardId: number;

  @JoinColumn({
    name: 'board_id',
  })
  @ManyToOne(() => Board, (board) => board.classes)
  board: Board;

  @OneToMany(() => User, (user) => user.boardClass)
  users: User[];
}
