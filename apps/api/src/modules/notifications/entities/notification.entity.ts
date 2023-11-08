import { BaseEntity } from 'src/common/base';
import { NotificationObject } from 'src/modules/notification-objects/entities/notification-object.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'notifications',
})
export class Notification extends BaseEntity {
  @Column({ name: 'notification_object_id' })
  notificationObjectId: number;

  @JoinColumn({ name: 'notification_object_id' })
  @ManyToOne(() => NotificationObject, (notificationObject) => notificationObject.notifications)
  notificationObject: NotificationObject;

  @Column({ name: 'receiver_id' })
  receiverId: number;

  @JoinColumn({ name: 'receiver_id' })
  @ManyToOne(() => User, (user) => user.notificationsReceived)
  receiver: User;

  @Column()
  status: boolean;
}
