import { Module } from '@nestjs/common'
import { TwitterService } from './twitter.service'
import { TwitterController } from './twitter.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  controllers: [TwitterController],
  imports: [HttpModule],
  providers: [TwitterService],
})
export class TwitterModule {}
