import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { EchoModule } from './echo/echo.module';
import { GreeterModule } from './greeter/greeter.module';
import { GreeterBotName } from './app.constants';
import { sessionMiddleware } from './middleware/session.middleware';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '',
      include: [EchoModule],
    }),
    TelegrafModule.forRootAsync({
      botName: GreeterBotName,
      useFactory: () => ({
        token: '',
        middlewares: [sessionMiddleware],
        include: [GreeterModule],
      }),
    }),
    EchoModule,
    GreeterModule,
  ],
})
export class AppModule {}
