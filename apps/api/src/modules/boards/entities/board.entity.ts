import { BaseEntity } from 'src/common';
import { BoardClass } from 'src/modules/board-classes/entities/board-class.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'boards',
})
export class Board extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => BoardClass, (boardClass) => boardClass.board)
  classes: BoardClass[];

  @OneToMany(() => User, (user) => user.board)
  users: User[];
}
