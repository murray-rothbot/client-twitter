import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'

export const swaggerConfig = async function conf(app: INestApplication): Promise<void> {
  const cfgService = app.get(ConfigService)
  const config = new DocumentBuilder()
    .setTitle(cfgService.get<string>('APPLICATION_NAME', ''))
    .setDescription(cfgService.get<string>('APPLICATION_DESCRIPTION', ''))
    .setVersion(cfgService.get<string>('APPLICATION_VERSION', ''))
    .addBearerAuth()
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
  }
  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  })
}
