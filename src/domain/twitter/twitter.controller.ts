import { Controller } from '@nestjs/common'
import { TwitterService } from './twitter.service'
import { TwitterApi } from 'twitter-api-v2'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'

@Controller('twitter')
export class TwitterController {
  clientTwitter = null
  consoleMode: boolean = this.cfgService.get<string>('CONSOLE_MODE') === 'true' ? true : false
  twitterBearerToken: string = this.cfgService.get<string>('TWITTER_BEARER_TOKEN')
  twitterConsumerKey: string = this.cfgService.get<string>('TWITTER_CONSUMER_KEY')
  twitterConsumerSecret: string = this.cfgService.get<string>('TWITTER_CONSUMER_SECRET')
  twitterAccessTokenKey: string = this.cfgService.get<string>('TWITTER_ACCESS_TOKEN_KEY')
  twitterAccessTokenSecret: string = this.cfgService.get<string>('TWITTER_ACCESS_TOKEN_SECRET')

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
  }

  // tweet price
  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  postPrice() {
    this.twitterService.postPrices(this.clientTwitter, this.consoleMode)
  }

  // tweet ln stats
  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  @Cron(CronExpression.EVERY_DAY_AT_7PM)
  postLn() {
    this.twitterService.postLn(this.clientTwitter, this.consoleMode)
  }

  // tweet fees
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  @Cron(CronExpression.EVERY_DAY_AT_8PM)
  postFees() {
    this.twitterService.postFees(this.clientTwitter, this.consoleMode)
  }

  // tweet LN Top Nodes
  // @Cron(CronExpression.EVERY_DAY_AT_9AM)
  // @Cron(CronExpression.EVERY_DAY_AT_9PM)
  // postLnTop() {
  //   this.twitterService.postLnTop(this.clientTwitter, this.consoleMode)
  // }

  // tweet difficulty
  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  postDifficulty() {
    this.twitterService.postDifficulty(this.clientTwitter, this.consoleMode)
  }

  // tweet marketcap
  @Cron(CronExpression.EVERY_DAY_AT_11AM)
  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  postMarketcap() {
    this.twitterService.postMarketcap(this.clientTwitter, this.consoleMode)
  }

  // tweet op_return
}
