import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { ChaptersModule } from './modules/chapters/chapters.module';
import { TopicsModule } from './modules/topics/topics.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { QuizesModule } from './modules/quizes/quizes.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { McqsModule } from './modules/mcqs/mcqs.module';
import { McqOptionsModule } from './modules/mcq-options/mcq-options.module';
import { TopicVideosModule } from './modules/topic-videos/topic-videos.module';
import { QuizMcqsModule } from './modules/quiz-mcqs/quiz-mcqs.module';
import { QuizMcqoptionsModule } from './modules/quiz-mcqoptions/quiz-mcqoptions.module';
import { QuizResultsModule } from './modules/quiz-results/quiz-results.module';
import { AppCornersModule } from './modules/app-corners/app-corners.module';
import { VideoRatingsModule } from './modules/video-ratings/video-ratings.module';
import { VideoLikesModule } from './modules/video-likes/video-likes.module';
import { OnlineClassesModule } from './modules/online-classes/online-classes.module';
import { NotificationObjectsModule } from './modules/notification-objects/notification-objects.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { NotificationChangesModule } from './modules/notification-changes/notification-changes.module';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomExceptionFilter } from './common/filters/exception.filter';
import { config, environments, validationSchema } from './config/env';
import { Typings } from '@tresdoce-nestjs-toolkit/paas';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MulterModule } from '@nestjs/platform-express';
import { ApiKeyGuard, JwtAuthGuard, RolesGuard } from './common';
import { UtilsModule } from './modules/utils/utils.module';
import { MessagesModule } from './modules/messages/messages.module';
import { QuizAttemptsModule } from './modules/quiz-attempts/quiz-attempts.module';
import { MailModule } from './modules/mail/mail.module';
import { BoardsModule } from './modules/boards/boards.module';
import { BoardClassesModule } from './modules/board-classes/board-classes.module';
import { PastPapersModule } from './modules/past-papers/past-papers.module';
import { OTPCodesModule } from './modules/otp-codes/otp-codes.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LoginDeviceInfoModule } from './modules/login-device-info/login-device-info.module';
import { UserQuizModule } from './modules/user-quiz/user-quiz.module';
import { UserQuizAnswerModule } from './modules/user-quiz-answer/user-quiz-answer.module';
import { RecentlyLearnVideosModule } from './modules/recently-learn-videos/recently-learn-videos.module';
import { WebsiteContentModule } from './modules/website-content/website-content.module';
import { ServeStaticModule } from '@nestjs/serve-static';

console.log('ENV', environments[`${process.env.NODE_ENV}`]);
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'client', 'dist'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'), // Path to your uploads folder
      serveRoot: '/upload', // URL path under which static files will be served
    }),

    ScheduleModule.forRoot(),
    // CacheModule.register({ isGlobal: true }),
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     isGlobal: true,
    //     ttl: parseInt(configService.get('CACHE_TTL')),
    //   }),
    //   inject: [ConfigService],
    // }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        dest: config.get<string>('MULTER_DEST'),
        preservePath: true,
      }), // set the default upload directory
    }),
    // ThrottlerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     ttl: config.get<number>('THROTTLE_TTL'),
    //     limit: config.get<number>('THROTTLE_LIMIT'),
    //   }),
    // }),
    I18nModule.forRootAsync({
      inject: [ConfigService],
      resolvers: [AcceptLanguageResolver],
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: 'en',
        fallbacks: {
          'en-US': 'en',
          'en-GB': 'en',
        },
        loaderOptions: {
          path: join(__dirname, '..', 'i18n'),
          watch: true,
        },
        // REVIEW: Is this necessary?
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: environments[`${process.env.NODE_ENV}`],
      // ignoreEnvFile: process.env.NODE_ENV === 'production' || false,
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService['internalConfig'][
          'config'
        ] as Typings.AppConfig;

        return config.database.typeorm;

        // return dataSourceOptions
      },
    }),
    UsersModule,
    SubjectsModule,
    ChaptersModule,
    TopicsModule,
    ExercisesModule,
    QuizesModule,
    QuestionsModule,
    McqsModule,
    McqOptionsModule,
    TopicVideosModule,
    QuizMcqsModule,
    QuizMcqoptionsModule,
    QuizResultsModule,
    AppCornersModule,
    VideoRatingsModule,
    VideoLikesModule,
    OnlineClassesModule,
    NotificationObjectsModule,
    NotificationsModule,
    NotificationChangesModule,
    UtilsModule,
    MessagesModule,
    QuizAttemptsModule,
    MailModule,
    BoardsModule,
    BoardClassesModule,
    PastPapersModule,
    OTPCodesModule,
    AuthModule,
    LoginDeviceInfoModule,
    WebsiteContentModule,
    UserQuizModule,
    UserQuizAnswerModule,
    RecentlyLearnVideosModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CustomResponseInterceptor,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: ApiKeyGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
