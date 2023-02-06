import { AxiosResponse } from 'axios'
import { catchError, lastValueFrom, map } from 'rxjs'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class MurrayServiceRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly cfgService: ConfigService,
  ) {}

  baseUrl: string = this.cfgService.get<string>('MURRAY_SERVICE')
  webhookUrl: string = this.cfgService.get<string>('CLIENT_TWITTER_WEBHOOK')

  // Paid Services

  getInvoiceTip({ satoshis, user }): Promise<any> {
    const url = `${this.baseUrl}/payment/invoice/tip`
    const bodyData = {
      webhook: `${this.webhookUrl}/tip/${user.id}`,
      satoshis,
      userId: user.id,
      social: 'discord',
    }

    return this.postData(url, bodyData)
  }

  getInvoiceOpReturn({ message, user }): Promise<any> {
    const url = `${this.baseUrl}/payment/invoice/op-return`
    const bodyData = {
      webhook: `${this.webhookUrl}/op-return/${user.id}`,
      message,
      userId: user.id,
      social: 'discord',
    }

    return this.postData(url, bodyData)
  }

  // Blockchain

  getAddress({ address }): Promise<any> {
    const url = `${this.baseUrl}/blockchain/address/${address}`
    return this.getData(url)
  }

  getBlock({ hash = null, height = null }): Promise<any> | {} {
    let url = `${this.baseUrl}/blockchain/block`

    if (hash) {
      url = `${url}?hash=${hash}`
    } else if (height) {
      if (isNaN(height)) return { data: null }
      url = `${url}?height=${height}`
    }

    return this.getData(url)
  }

  getDifficulty(): Promise<any> {
    const url = `${this.baseUrl}/blockchain/difficulty`
    return this.getData(url)
  }

  getFee(): Promise<any> {
    const url = `${this.baseUrl}/blockchain/fees`
    return this.getData(url)
  }

  getTransaction({ transaction }): Promise<any> {
    const url = `${this.baseUrl}/blockchain/tx/${transaction}/mainnet`
    return this.getData(url)
  }

  // Prices

  getPrices(): Promise<any> {
    const url = `${this.baseUrl}/prices`
    return this.getData(url)
  }

  convert({ value, currency }): Promise<any> {
    const url = `${this.baseUrl}/prices/convert?value=${value}&currency=${currency}`
    return this.getData(url)
  }

  // Lightning

  getLightingStatistics(): Promise<any> {
    const url = `${this.baseUrl}/lightning/statistics`
    return this.getData(url)
  }

  getLightingTop(): Promise<any> {
    const url = `${this.baseUrl}/lightning/top`
    return this.getData(url)
  }

  getLightingNode({ pubkey }): Promise<any> {
    const url = `${this.baseUrl}/lightning/node/${pubkey}`
    return this.getData(url)
  }

  // Market

  getMarketCap(): Promise<any> {
    const url = `${this.baseUrl}/market/capitalization`
    return this.getData(url)
  }

  // Cronjobs

  async addCronJobs(cronjobList): Promise<any> {
    cronjobList.forEach(async ({ webhook, type, interval }) => {
      const url = `${this.baseUrl}/cronjobs`
      const bodyData = {
        webhook: webhook,
        type: type,
        social: 'discord',
        interval: interval,
      }
      await this.postData(url, bodyData)
    })
  }

  // Base

  defaultError = [
    {
      property: 'backend',
      constraints: {
        isValid: 'backend is not working',
      },
    },
  ]

  protected postData(url: string, bodyData: {}): Promise<any> {
    Logger.debug(`POST ${url}`)
    // Logger.debug(JSON.stringify(bodyData, null, 2))

    return lastValueFrom(
      this.httpService.post(url, bodyData).pipe(
        map((response: AxiosResponse<any>) => {
          return response.data
        }),
        catchError(async () => {
          Logger.error(`POST ${url}\n${JSON.stringify(bodyData, null, 2)}`)
          throw this.defaultError
        }),
      ),
    )
  }

  protected getData(url: string): Promise<any> {
    Logger.debug(`GET ${url}`)

    return lastValueFrom(
      this.httpService.get(url).pipe(
        map((response: AxiosResponse<any>) => {
          return response.data
        }),
        catchError(async () => {
          Logger.error(`GET ${url}`)
          throw this.defaultError
        }),
      ),
    )
  }
}
