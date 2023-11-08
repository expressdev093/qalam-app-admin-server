import { IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/base';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'app_corners',
})
export class AppCorner extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true, default: null })
  video?: string;

  @Column({ nullable: true, default: null })
  image?: string;

  @Column({ nullable: true, default: null, name: 'video_thumbnail' })
  videoThumbnail?: string;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;
}
