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
    this.postMarketcap()
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
  postLn() {
    this.twitterService.postLn(this.clientTwitter)
  }

  // tweet fees
  postFees() {
    this.twitterService.postFees(this.clientTwitter)
  }

  // tweet LN Top Nodes
  postLnTop() {
    this.twitterService.postLnTop(this.clientTwitter)
  }

  // tweet difficulty
  postDifficulty() {
    this.twitterService.postDifficulty(this.clientTwitter)
  }

  postMarketcap() {
    this.twitterService.postMarketcap(this.clientTwitter)
  }

  // tweet op_return
}
