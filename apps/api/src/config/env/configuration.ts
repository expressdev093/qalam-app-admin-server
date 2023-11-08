import { Typings } from '@tresdoce-nestjs-toolkit/paas';
import { registerAs } from '@nestjs/config';

import * as PACKAGE_JSON from '../../../package.json';
import { User } from 'src/modules/users/entities/user.entity';
import { AppCorner } from 'src/modules/app-corners/entities/app-corner.entity';
import { Chapter } from 'src/modules/chapters/entities/chapter.entity';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';
import { McqOption } from 'src/modules/mcq-options/entities/mcq-option.entity';
import { Mcq } from 'src/modules/mcqs/entities/mcq.entity';
import { NotificationChange } from 'src/modules/notification-changes/entities/notification-change.entity';
import { NotificationObject } from 'src/modules/notification-objects/entities/notification-object.entity';
import { Notification } from 'src/modules/notifications/entities/notification.entity';
import { OnlineClass } from 'src/modules/online-classes/entities/online-class.entity';
import { Question } from 'src/modules/questions/entities/question.entity';
import { QuizMcqoption } from 'src/modules/quiz-mcqoptions/entities/quiz-mcqoption.entity';
import { QuizMcq } from 'src/modules/quiz-mcqs/entities/quiz-mcq.entity';
import { QuizResult } from 'src/modules/quiz-results/entities/quiz-result.entity';
import { Quiz } from 'src/modules/quizes/entities/quiz.entity';
import { Subject } from 'src/modules/subjects/entities/subject.entity';
import { TopicVideo } from 'src/modules/topic-videos/entities/topic-video.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { VideoLike } from 'src/modules/video-likes/entities/video-like.entity';
import { VideoRating } from 'src/modules/video-ratings/entities/video-rating.entity';
import { QuizAttempt } from 'src/modules/quiz-attempts/entities/quiz-attempts.entity';
import { Board } from 'src/modules/boards/entities/board.entity';
import { BoardClass } from 'src/modules/board-classes/entities/board-class.entity';
import { PastPaper } from 'src/modules/past-papers/entities/past-papers.entity';
import { OTPCode } from 'src/modules/otp-codes/entities/otp-codes.entity';
import { LoginDeviceInfo } from 'src/modules/login-device-info/entities/login-device-info.entity';
import { ChapterView } from 'src/modules/chapters/entities/chapter.view';
import { TopicView } from 'src/modules/topics/entities/topic.view';
import { TopicVideosView } from 'src/modules/topics/entities/topic-video.view';
import { UserQuiz } from 'src/modules/user-quiz/entities/user-quiz.entity';
import { UserQuizAnswer } from 'src/modules/user-quiz-answer/entities/user-quiz-answer.entity';
import { OnlineClassView } from 'src/modules/online-classes/entities/online-class.view';
import { RecentlyLearnVideo } from 'src/modules/recently-learn-videos/entities/recently-learn-video.entity';
import { WebsiteContent } from 'src/modules/website-content/entities/website-content.entity';

export default registerAs(
  'config',
  (): Typings.AppConfig => ({
    project: {
      apiPrefix: process.env.API_PREFIX || 'API-PREFIX',
      name: PACKAGE_JSON.name,
      version: PACKAGE_JSON.version,
      description: PACKAGE_JSON.description,
      author: PACKAGE_JSON.author,
      repository: PACKAGE_JSON.repository,
      bugs: PACKAGE_JSON.bugs,
      homepage: PACKAGE_JSON.homepage,
    },
    server: {
      appStage: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
      isProd: process.env.NODE_ENV === 'production',
      port: parseInt(process.env.PORT, 10) || 8080,
      context: process.env.CONTEXT || 'v1',
      origins: process.env.ORIGINS ? process.env.ORIGINS.split(',') : '*',
      allowedHeaders: process.env.ALLOWED_HEADERS,
      allowedMethods: process.env.ALLOWED_METHODS,
      corsEnabled: process.env.CORS_ENABLED.toLowerCase() === 'true',
      corsCredentials: process.env.CORS_CREDENTIALS.toLowerCase() === 'true',
    },
    swagger: {
      path: process.env.SWAGGER_PATH || 'docs',
      enabled: process.env.SWAGGER_ENABLED.toLowerCase() === 'true',
    },
    params: {
      testEnv: process.env.TEST_KEY,
    },
    services: {},
    database: {
      typeorm: {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          AppCorner,
          Chapter,
          Exercise,
          McqOption,
          Mcq,
          NotificationChange,
          NotificationObject,
          Notification,
          OnlineClass,
          Question,
          QuizMcqoption,
          QuizMcq,
          QuizResult,
          Quiz,
          Subject,
          TopicVideo,
          Topic,
          User,
          LoginDeviceInfo,
          VideoLike,
          VideoRating,
          QuizAttempt,
          Board,
          BoardClass,
          PastPaper,
          OTPCode,
          UserQuiz,
          UserQuizAnswer,
          RecentlyLearnVideo,
          WebsiteContent,
          //Views
          ChapterView,
          TopicVideosView,
          TopicView,
          OnlineClassView,
        ],
        //entities: ['dist/**/*.entity.js'],
        migrations: ['dist/db/migrations/*js'],
        synchronize: true,
        autoLoadEntities: true,
        ...(process.env.DB_SSL.toLowerCase() === 'true'
          ? {
              ssl: true,
              extra: {
                ssl: {
                  rejectUnauthorized: false,
                },
              },
            }
          : {}),
      },
    },
  }),
);
