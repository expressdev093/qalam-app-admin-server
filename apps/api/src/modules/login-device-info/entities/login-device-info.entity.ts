import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'login_device_infos',
})
export class LoginDeviceInfo extends BaseEntity {
  @Column({ type: 'text', name: 'firebase_token' })
  firebaseToken: string;

  @ApiProperty()
  @Column({ name: 'device_name' })
  deviceName: string;

  @ApiProperty()
  @Column({ name: 'device_id' })
  deviceId: string;

  @ApiProperty()
  @Column({ name: 'brand' })
  brand: string;

  @ApiProperty()
  @Column({ name: 'ip_address' })
  ipAddress: string;

  @ApiProperty()
  @Column({ type: 'datetime', name: 'last_login' })
  lastLogin: Date;

  @ApiProperty()
  @Column({ name: 'is_current_device' })
  isCurrentDevice: boolean;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.devices)
  user: User;
}
