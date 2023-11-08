import { BaseEntity } from 'src/common/base';
import { TopicVideo } from 'src/modules/topic-videos/entities/topic-video.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'video_likes',
})
export class VideoLike extends BaseEntity {
  @Column()
  isLiked: boolean;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @Column({ name: 'video_id' })
  videoId: number;

  @ManyToOne(() => User, (user) => user.videoLikes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => TopicVideo, (video) => video.videoLikes)
  @JoinColumn({ name: 'video_id' })
  video: TopicVideo;
}
