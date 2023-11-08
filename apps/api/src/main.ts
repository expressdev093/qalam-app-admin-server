import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionsFilter, Typings } from '@tresdoce-nestjs-toolkit/paas';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import * as fs from 'fs';
import { join } from 'path';

async function bootstrap() {
  let httpsOptions = null;
  const ssl = process.env.SSL === 'true' ? true : false;
  if (ssl) {
    const keyPath = process.env.SSL_KEY_PATH || '';
    const certPath = process.env.SSL_CERT_PATH || '';
    httpsOptions = {
      key: fs.readFileSync(join(__dirname, keyPath)),
      cert: fs.readFileSync(join(__dirname, certPath)),
    };
  }
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
    httpsOptions,
  });

  const configService = app.get<ConfigService>(ConfigService);

  const appConfig = configService['internalConfig']['config'];
  const { server, swagger, project } = appConfig as Typings.AppConfig;
  const port = parseInt(server.port.toString(), 10) || 8080;

  app.setGlobalPrefix(`${project.apiPrefix}`);

  app.use([cookieParser(), helmet({ crossOriginResourcePolicy: false }), compression()]);

  app.useGlobalFilters(new ExceptionsFilter(appConfig));
  // app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('class-transformer'),
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (swagger.enabled) {
    const config = new DocumentBuilder()
      .setTitle(`${project.name}`)
      .setVersion(`${project.version}`)
      .setDescription(`Swagger - ${project.description}`)
      .setExternalDoc('Documentation', project.homepage)
      .setContact(project.author.name, project.author.url, project.author.email)
      .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
      .addBearerAuth()
      .addServer(`/${project.apiPrefix}`)

      .build();
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup(`${project.apiPrefix}/${swagger.path}`, app, document, {});
  }

  if (server.corsEnabled) {
    app.enableCors({
      origin: server.origins,
      allowedHeaders: `${server.allowedHeaders}`,
      methods: `${server.allowedMethods}`,
      credentials: server.corsCredentials,
      exposedHeaders: configService.get<string>('ALLOWD_EXPOSE_HEADERS'),
    });
  }

  app.use(
    join(__dirname, '..', configService.get<string>('MULTER_DEST')),
    express.static(configService.get<string>('MULTER_DEST')),
  );
  app.use(
    `/${configService.get<string>('MULTER_DEST')}`,
    express.static(configService.get<string>('MULTER_DEST')),
  );

  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();

  // app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(port, async () => {
    const appServer = `http${ssl ? 's' : ''}://${configService.get<string>('HOST')}:${port}/${
      project.apiPrefix
    }`;
    Logger.log(`📚 Swagger is running on: ${appServer}/${swagger.path}`, `${project.name}`);
    Logger.log(`🚀 Application is running on: ${appServer}`, `${project.name}`);
  });
}
(async () => await bootstrap())();
//AppClusterService.clusterize(bootstrap);
