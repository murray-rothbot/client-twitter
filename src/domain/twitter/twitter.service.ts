import { Injectable, Logger } from '@nestjs/common'
import { MurrayServiceRepository } from 'src/repositories'

@Injectable()
export class TwitterService {
  private readonly logger = new Logger(TwitterService.name)

  constructor(private readonly murrayService: MurrayServiceRepository) {}

  async postTweet(clientTwitter: any, tweet: any, consoleMode: boolean) {
    if (consoleMode) {
      console.log(tweet)
    } else {
      await clientTwitter.v2.tweet(tweet)
    }
  }

  async postLn(clientTwitter: any, consoleMode: boolean) {
    let message = ''
    const lnStats = await this.murrayService.getLightingStatistics()
    if (lnStats.data?.fields) {
      const { nodes, clearNet, tor, avgCapacity, totalCapacity, channels, avgFee, avgBaseFee } =
        lnStats.data.fields

      message += `
${lnStats.data.title}

${nodes.description} ${nodes.value}
${clearNet.description} - ${clearNet.value}
${tor.description} - ${tor.value}
${channels.description} - ${channels.value}
${avgCapacity.description} - ${avgCapacity.value}
${totalCapacity.description} - ${totalCapacity.value}
${avgFee.description} - ${avgFee.value}
${avgBaseFee.description} - ${avgBaseFee.value}

`
      message += `#MurrayRothbotLNStats #Bitcoin`
      if (consoleMode) {
        console.log(message)
      } else {
        await this.postTweet(clientTwitter, message, consoleMode)
      }
    }
  }

  async postPrices(clientTwitter: any, consoleMode: boolean) {
    const prices = await this.murrayService.getPrices()
    let message = `${prices.data.title}
`

    if (prices.data?.fields) {
      Object.keys(prices.data.fields).forEach((key) => {
        const price = prices.data.fields[key]
        const values = price.value.split('\n')

        message += `
${price.description}
${values[0]}
${values[1]}

`
      })
      message += `#MurrayRothbotPricesReport #Bitcoin`
      if (consoleMode) {
        console.log(message)
      } else {
        await this.postTweet(clientTwitter, message, consoleMode)
      }
    }
  }

  async postFees(clientTwitter: any, consoleMode: boolean) {
    let message = ''
    const fees = await this.murrayService.getFee()
    if (fees.data?.fields) {
      const { fastestFee, halfHourFee, hourFee, economy, minimum } = fees.data.fields
      message += `
${fees.data.title}

${fastestFee.description} ${fastestFee.value}
${halfHourFee.description} - ${halfHourFee.value}
${hourFee.description} - ${hourFee.value}
${economy.description} - ${economy.value}
${minimum.description} - ${minimum.value}

`
      message += `#MurrayRothbotFeesReport #Bitcoin`
      if (consoleMode) {
        console.log(message)
      } else {
        await this.postTweet(clientTwitter, message, consoleMode)
      }
    }
  }

  async postLnTop(clientTwitter: any, consoleMode: boolean) {
    let message = ''
    const lnTop = await this.murrayService.getLightingTop()
    if (lnTop.data?.fields) {
      message += `
${lnTop.data.title}

${lnTop.data.fields.topByCapacity.description} 

${lnTop.data.fields.topByCapacity.value.node0.description}
${lnTop.data.fields.topByCapacity.value.node0.value}

${lnTop.data.fields.topByCapacity.value.node1.description}
${lnTop.data.fields.topByCapacity.value.node1.value}

${lnTop.data.fields.topByCapacity.value.node2.description}
${lnTop.data.fields.topByCapacity.value.node2.value}


${lnTop.data.fields.topByChannels.description} 

${lnTop.data.fields.topByChannels.value.node0.description}
${lnTop.data.fields.topByChannels.value.node0.value}

${lnTop.data.fields.topByChannels.value.node1.description}
${lnTop.data.fields.topByChannels.value.node1.value}

${lnTop.data.fields.topByChannels.value.node2.description}
${lnTop.data.fields.topByChannels.value.node2.value}

`
      message += `#Bitcoin`
      if (consoleMode) {
        console.log(message)
      } else {
        await this.postTweet(clientTwitter, message, consoleMode)
      }
    }
  }

  //format date to dd/mm/yyyy
  formatDate = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  async postDifficulty(clientTwitter: any, consoleMode: boolean) {
    let message = ''
    const difficulty = await this.murrayService.getDifficulty()

    let progressMessage = ''
    const currentProgress = difficulty.data.fields.currentProgress.value.toFixed(2)

    let i = 0
    while (i <= 100) {
      progressMessage += '▓'
      if (currentProgress < i) {
        progressMessage += '░'
      }

      i += 10
    }
    progressMessage += ` ${currentProgress}%`

    if (difficulty.data?.fields) {
      message += `
${difficulty.data.title}

${difficulty.data.fields.currentProgress.description}
${progressMessage}


${difficulty.data.fields.estimatedDate.description} - ${this.formatDate(
        new Date(difficulty.data.fields.estimatedDate.value),
      )}

${difficulty.data.fields.estimateChange.description} - ${
        difficulty.data.fields.estimateChange.value
      }
${difficulty.data.fields.previousChange.description} - ${
        difficulty.data.fields.previousChange.value
      }

`
      message += `#Bitcoin #DifficultyAjustment`
      if (consoleMode) {
        console.log(message)
      } else {
        await this.postTweet(clientTwitter, message, consoleMode)
      }
    }
  }

  async postMarketcap(clientTwitter: any, consoleMode: boolean) {
    let message = ''
    const marketCap = await this.murrayService.getMarketCap()

    if (marketCap.data?.fields) {
      message += `
${marketCap.data.title}

${marketCap.data.fields.btcusd.value.price.description} - ${marketCap.data.fields.btcusd.value.price.value}
${marketCap.data.fields.btcusd.value.satsPerFiat.description} - ${marketCap.data.fields.btcusd.value.satsPerFiat.value}
${marketCap.data.fields.btcusd.value.marketCap.description} - ${marketCap.data.fields.btcusd.value.marketCap.value}


${marketCap.data.fields.btcbrl.value.price.description} - ${marketCap.data.fields.btcbrl.value.price.value}
${marketCap.data.fields.btcbrl.value.satsPerFiat.description} - ${marketCap.data.fields.btcbrl.value.satsPerFiat.value}
${marketCap.data.fields.btcbrl.value.marketCap.description} - ${marketCap.data.fields.btcbrl.value.marketCap.value}

`
      message += `#Bitcoin #MarketCap`
      if (consoleMode) {
        console.log(message)
      } else {
        await this.postTweet(clientTwitter, message, consoleMode)
      }
    }
  }
}
