import { Controller } from '@nestjs/common'
import { TwitterService } from './twitter.service'
import { TwitterApi } from 'twitter-api-v2'
import { ConfigService } from '@nestjs/config'

@Controller('twitter')
export class TwitterController {
  constructor(
    private readonly twitterService: TwitterService,
    private readonly cfgService: ConfigService,
  ) {
    this.clientTwitter = new TwitterApi({
      appKey: this.twitterConsumerKey,
      appSecret: this.twitterConsumerSecret,
      accessToken: this.twitterAccessTokenKey,
      accessSecret: this.twitterAccessTokenSecret,
    })
    this.postPrice()
  }

  clientTwitter = null
  twitterBearerToken: string = this.cfgService.get<string>('TWITTER_BEARER_TOKEN')
  twitterConsumerKey: string = this.cfgService.get<string>('TWITTER_CONSUMER_KEY')
  twitterConsumerSecret: string = this.cfgService.get<string>('TWITTER_CONSUMER_SECRET')
  twitterAccessTokenKey: string = this.cfgService.get<string>('TWITTER_ACCESS_TOKEN_KEY')
  twitterAccessTokenSecret: string = this.cfgService.get<string>('TWITTER_ACCESS_TOKEN_SECRET')

  // tweet price
  postPrice() {
    this.twitterService.postPrices(this.clientTwitter)
  }

  // tweet ln stats

  // tweet fees

  // tweet blockchain info

  // tweet op_return
}
