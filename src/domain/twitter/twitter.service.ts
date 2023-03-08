import { Injectable, Logger } from '@nestjs/common'
import { MurrayServiceRepository } from 'src/repositories'

@Injectable()
export class TwitterService {
  private readonly logger = new Logger(TwitterService.name)
  constructor(private readonly murrayService: MurrayServiceRepository) {}

  async postPrices(clientTwitter: any) {
    let message = ''
    const prices = await this.murrayService.getPrices()

    if (prices.data?.fields) {
      console.log(prices.data.fields)

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
