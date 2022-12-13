import { ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { getMongoConnectionString } from "@readme/core";

export function getMongoDbConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      uri: getMongoConnectionString({
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        databaseName: configService.get('database.name'),
        authDatabase: configService.get('database.database'),
      })
    }),
    inject: [ConfigService]
  }
}