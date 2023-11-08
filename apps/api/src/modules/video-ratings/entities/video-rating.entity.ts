import { BaseEntity } from 'src/common/base';
import { TopicVideo } from 'src/modules/topic-videos/entities/topic-video.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({
  name: 'video_ratings',
})
export class VideoRating extends BaseEntity {
  @Column()
  rating: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.videoRatings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'video_id',
  })
  videoId: number;

  @ManyToOne(() => TopicVideo, (video) => video.videoRatings)
  @JoinColumn({ name: 'video_id' })
  video: TopicVideo;
}
