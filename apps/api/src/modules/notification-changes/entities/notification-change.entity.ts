import { BaseEntity } from 'src/common/base';
import { NotificationObject } from 'src/modules/notification-objects/entities/notification-object.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'notification_changes',
})
export class NotificationChange extends BaseEntity {
  @Column({ name: 'notification_object_id' })
  notificationObjectId: number;

  @JoinColumn({ name: 'notification_object_id' })
  @ManyToOne(
    () => NotificationObject,
    (notificationObject) => notificationObject.notificationChanges,
  )
  notificationObject: NotificationObject;

  @Column({ name: 'sender_id' })
  senderId: number;

  @JoinColumn({ name: 'sender_id' })
  @ManyToOne(() => User, (user) => user.notificationSends)
  sender: User;

  @Column()
  status: boolean;
}
