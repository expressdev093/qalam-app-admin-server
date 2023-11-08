import { BaseEntity } from 'src/common';
import { TopicVideo } from 'src/modules/topic-videos/entities/topic-video.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'recently_learn_videos' })
export class RecentlyLearnVideo extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.recentlyLearnVideos)
  user: User;

  @Column({ name: 'topic_video_id' })
  topicVideoId: number;

  @JoinColumn({ name: 'topic_video_id' })
  @ManyToOne(() => TopicVideo, (topicVideo) => topicVideo.recentlyLearnVideos)
  topicVideo: TopicVideo;
}
