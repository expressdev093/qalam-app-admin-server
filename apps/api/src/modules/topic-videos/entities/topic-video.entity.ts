import { BaseEntity } from 'src/common/base';
import { RecentlyLearnVideo } from 'src/modules/recently-learn-videos/entities/recently-learn-video.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { VideoLike } from 'src/modules/video-likes/entities/video-like.entity';
import { VideoRating } from 'src/modules/video-ratings/entities/video-rating.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';

@Entity({
  name: 'topic_videos',
})
@Index('index_title', ['title'])
export class TopicVideo extends BaseEntity {
  @Index({ fulltext: true })
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true, default: null })
  description?: string;

  @Column()
  url: string;

  @Column()
  thumbnail: string;

  @Column({
    name: 'topic_id',
  })
  topicId: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @JoinColumn({
    name: 'topic_id',
  })
  @ManyToOne(() => Topic, (topic) => topic.videos)
  topic: Topic;

  @OneToMany(() => VideoRating, (videoRating) => videoRating.video)
  videoRatings: VideoRating[];

  @OneToMany(() => VideoLike, (videoLike) => videoLike.video)
  videoLikes: VideoLike[];

  totalRatings: number;
  totalLikes: number;

  @OneToMany(
    () => RecentlyLearnVideo,
    (recentlyLearnVideo) => recentlyLearnVideo.topicVideo,
  )
  recentlyLearnVideos: RecentlyLearnVideo[];
}
