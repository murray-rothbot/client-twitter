import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config/env.config'
import { TwitterModule } from './domain/twitter/twitter.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TwitterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
