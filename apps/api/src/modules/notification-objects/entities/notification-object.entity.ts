import { BaseEntity } from 'src/common/base';
import { NotificationChange } from 'src/modules/notification-changes/entities/notification-change.entity';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { NotificationEntityType } from '../enum/notification-entitytype.enum';

@Entity({
  name: 'notification_objects',
})
export class NotificationObject extends BaseEntity {
  @Column('enum', { enum: NotificationEntityType, name: 'entity_type' })
  entityType: NotificationEntityType;

  @Column({ name: 'entity_id' })
  entityId: number;

  @Column({ default: false })
  status: boolean;

  @OneToMany(() => Notification, (notification) => notification.notificationObject)
  notifications: Notification[];

  @OneToMany(
    () => NotificationChange,
    (notificationChange) => notificationChange.notificationObject,
  )
  notificationChanges: NotificationChange[];
}
