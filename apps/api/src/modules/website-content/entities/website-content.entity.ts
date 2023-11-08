import { BaseEntity } from 'src/common';
import { Entity, Column } from 'typeorm';
import { WebsiteContentType } from '../enum/website-content-type.enum';

@Entity({
  name: 'webite_contents',
})
export class WebsiteContent extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column('enum', { enum: WebsiteContentType })
  type: WebsiteContentType;
}
