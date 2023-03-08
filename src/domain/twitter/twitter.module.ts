import { Module } from '@nestjs/common'
import { TwitterService } from './twitter.service'
import { TwitterController } from './twitter.controller'
import { HttpModule } from '@nestjs/axios'
import { MurrayServiceRepository } from 'src/repositories'

@Module({
  controllers: [TwitterController],
  imports: [HttpModule],
  providers: [TwitterService, MurrayServiceRepository],
})
export class TwitterModule {}
