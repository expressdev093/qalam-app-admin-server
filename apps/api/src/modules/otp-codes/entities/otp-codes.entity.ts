import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'otp_codes' })
export class OTPCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.otpCodes)
  user: User;

  @Column()
  code: string;

  @Column()
  expiresAt: Date;
}
