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
      console.log(message)
    }
  }

  async postPrices(clientTwitter: any) {
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
      console.log(message)
      // await this.clientTwitter.v1.tweet(message)
    }
  }

  async postFees(clientTwitter: any) {
    let message = ''
    const fees = await this.murrayService.getFee()
    if (fees.data?.fields) {
      const { fastestFee, halfHourFee, hourFee, economy, minimum } = fees.data.fields
      console.log(fees.data?.fields)
      message += `
${fees.data.title}

${fastestFee.description} ${fastestFee.value}
${halfHourFee.description} - ${halfHourFee.value}
${hourFee.description} - ${hourFee.value}
${economy.description} - ${economy.value}
${minimum.description} - ${minimum.value}

`
      message += `#MurrayRothbotFeesReport #Bitcoin`
      console.log(message)
    }
  }

  async postLnTop(clientTwitter: any) {
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
      console.log(message)
    }
  }
}
