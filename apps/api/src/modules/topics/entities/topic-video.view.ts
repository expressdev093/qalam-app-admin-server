import { DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Topic } from './topic.entity';
import { TopicVideo } from 'src/modules/topic-videos/entities/topic-video.entity';
import { Subject } from 'src/modules/subjects/entities/subject.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('T.*')
      .addSelect('TV.id', 'video_id')
      .addSelect('TV.title', 'video_title')
      .addSelect('TV.description', 'video_description')
      .addSelect('TV.url', 'video_url')
      .addSelect('TV.thumbnail', 'video_thumbnail')
      .addSelect('TV.views', 'video_views')
      .addSelect('S.name', 'subject_name')
      .addSelect('S.image', 'subject_image')
      .from(Topic, 'T')
      .innerJoin(TopicVideo, 'TV', 'TV.topic_id = T.id')
      .innerJoin(Subject, 'S', 'T.subject_id= S.id'),
})
export class TopicVideosView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  description: string;

  @ViewColumn()
  image: string;

  @ViewColumn({ name: 'chapter_id' })
  chapterId: number;

  @ViewColumn({ name: 'subject_id' })
  subjectId: number;

  @ViewColumn({ name: 'is_active' })
  isActive: boolean;

  @ViewColumn({ name: 'video_id' })
  videoId: number;

  @ViewColumn({ name: 'video_title' })
  videoTitle: string;

  @ViewColumn({ name: 'video_description' })
  videoDescription: string;

  @ViewColumn({ name: 'video_url' })
  videoUrl: string;

  @ViewColumn({ name: 'video_thumbnail' })
  videoThumbnail: string;

  @ViewColumn({ name: 'video_views' })
  videoViews: number;

  @ViewColumn({ name: 'subject_name' })
  subjectName: string;

  @ViewColumn({ name: 'subject_image' })
  subjectImage: string;
}
