import { Injectable, Logger } from '@nestjs/common'
import { MurrayServiceRepository } from 'src/repositories'

@Injectable()
export class TwitterService {
  private readonly logger = new Logger(TwitterService.name)
  constructor(private readonly murrayService: MurrayServiceRepository) {}

  async postLn(clientTwitter: any) {
    let message = ''
    const lnStats = await this.murrayService.getLightingStatistics()
    if (lnStats.data?.fields) {
      const { nodes, clearNet, tor, avgCapacity, totalCapacity, channels, avgFee, avgBaseFee } =
        lnStats.data.fields

      message += `
Lightning Network 🌩️

${nodes.description} ${nodes.value}
${clearNet.description} - ${clearNet.value}
${tor.description} - ${tor.value}
${channels.description} - ${channels.value}
${avgCapacity.description} - ${avgCapacity.value}
${totalCapacity.description} - ${totalCapacity.value}
${avgFee.description} - ${avgFee.value}
${avgBaseFee.description} - ${avgBaseFee.value}

`
      message += `#MurrayRothbotLNStats`
      console.log(message)
    }
  }

  async postPrices(clientTwitter: any) {
    let message = ''
    const prices = await this.murrayService.getPrices()

    if (prices.data?.fields) {
      Object.keys(prices.data.fields).forEach((key) => {
        const price = prices.data.fields[key]
        const values = price.value.split('\n')

        message += `
${price.description} 📊

 ${values[0]}
${values[1]}

`
      })

      console.log(`${message} #MurrayRothbotPriceAlerts`)
      // await this.clientTwitter.v1.tweet(message)
    }
  }
}
