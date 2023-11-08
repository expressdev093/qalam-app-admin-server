import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/base';
import { NotificationChange } from 'src/modules/notification-changes/entities/notification-change.entity';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { QuizResult } from 'src/modules/quiz-results/entities/quiz-result.entity';
import { VideoLike } from 'src/modules/video-likes/entities/video-like.entity';
import { VideoRating } from 'src/modules/video-ratings/entities/video-rating.entity';
import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { LoginProvider } from '../enum/login-provider.enum';
import { Role } from '../enum/role.enum';
import * as bcrypt from 'bcrypt';
import { QuizAttempt } from 'src/modules/quiz-attempts/entities/quiz-attempts.entity';
import { OTPCode } from 'src/modules/otp-codes/entities/otp-codes.entity';
import { BoardClass } from 'src/modules/board-classes/entities/board-class.entity';
import { Board } from 'src/modules/boards/entities/board.entity';
import { LoginDeviceInfo } from 'src/modules/login-device-info/entities/login-device-info.entity';
import { Quiz } from 'src/modules/quizes/entities/quiz.entity';
import { UserQuiz } from 'src/modules/user-quiz/entities/user-quiz.entity';
import { RecentlyLearnVideo } from 'src/modules/recently-learn-videos/entities/recently-learn-video.entity';
@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true, default: null })
  password: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'country_code', nullable: true })
  countryCode: string;

  @Column({ name: 'country_short_code', nullable: true })
  countryShortCode: string;

  @Column('enum', { enum: Role, default: Role.User })
  role: Role;

  @Column('enum', { enum: LoginProvider })
  provider: LoginProvider;

  @Column({ nullable: true, default: null, name: 'google_id' })
  googleId: string;

  @Column({ nullable: true, default: null, name: 'facebook_id' })
  facebookId: string;

  @Column({ nullable: true, default: null, name: 'apple_id' })
  appleId: string;

  @Column({ nullable: true, default: null })
  avatar: string;

  @Column({ default: false, name: 'is_verified' })
  isVerified: boolean;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => QuizResult, (quizResult) => quizResult.user)
  quizResults: QuizResult[];

  @OneToMany(() => VideoRating, (videoRating) => videoRating.user)
  videoRatings: VideoRating[];

  @OneToMany(() => VideoLike, (videoLike) => videoLike.user)
  videoLikes: VideoLike[];

  @OneToMany(() => Notification, (notification) => notification.receiver)
  notificationsReceived: Notification[];

  @OneToMany(() => NotificationChange, (notificationChange) => notificationChange.sender)
  notificationSends: NotificationChange[];

  @OneToMany(() => LoginDeviceInfo, (device) => device.user)
  devices: LoginDeviceInfo[];

  @OneToMany(() => QuizAttempt, (quizAttempt) => quizAttempt.user)
  quizAttempts: QuizAttempt[];

  @OneToMany(() => OTPCode, (code) => code.user)
  otpCodes: OTPCode[];

  @Column({ name: 'board_class_id', nullable: true })
  boardClassId?: number;

  @Column({ name: 'board_id', nullable: true })
  boardId?: number;

  @JoinColumn({
    name: 'board_id',
  })
  @ManyToOne(() => Board, (board) => board.users)
  board: Board;

  @JoinColumn({
    name: 'board_class_id',
  })
  @ManyToOne(() => BoardClass, (boardClass) => boardClass.users)
  boardClass: BoardClass;

  @OneToMany(() => UserQuiz, (userQuiz) => userQuiz.user)
  userQuizzes: UserQuiz[];

  @OneToMany(() => RecentlyLearnVideo, (recentlyLearnVideo) => recentlyLearnVideo.user)
  recentlyLearnVideos: RecentlyLearnVideo[];

  withoutPassword() {
    return Object.fromEntries(Object.entries(this).filter(([key, val]) => key !== 'password'));
  }

  // @BeforeInsert()
  //   async hashPassword() {
  //       this.password = await bcrypt.hash(this.password, 10);
  //   }

  //   async comparePassword(attempt: string): Promise<boolean> {
  //       return await bcrypt.compare(attempt, this.password);
  //   }
}
