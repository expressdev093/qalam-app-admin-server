import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { MailController } from './mail.controller';
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        const isGmail = config.get<boolean>('IS_GMAIL');
        return {
          transport: {
            host: isGmail ? config.get('GMAIL_MAIL_HOST') : config.get('MAIL_HOST'),
            service: isGmail ? config.get('GMAIL_MAIN_SERVICE') : undefined,
            port: isGmail
              ? config.get<number>('GMAIL_MAIL_HOST_PORT')
              : config.get<number>('MAIL_HOST_PORT'),
            secure: isGmail
              ? config.get<boolean>('GMAIL_MAIL_HOST_SECURE')
              : config.get<boolean>('MAIL_HOST_SECURE'),
            auth: {
              user: isGmail ? config.get('GMAIL_MAIL_USER') : config.get('MAIL_USER'),
              pass: isGmail ? config.get('GMAIL_MAIL_PASSWORD') : config.get('MAIL_PASSWORD'),
            },
          },
          defaults: {
            from: `"No Reply" <${
              isGmail ? config.get('GMAIL_MAIL_FROM') : config.get('MAIL_FROM')
            }>`,
          },
          template: {
            dir: join(__dirname, 'mail', 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
