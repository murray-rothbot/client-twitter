import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class TwitterService {
  private readonly logger = new Logger(TwitterService.name)
  constructor() {}

  async postPrices(clientTwitter) {
    const message = 'Hello, my name is Murray Rothbot!'
    console.log(message)
    // await this.clientTwitter.v1.tweet(message)
  }
}
