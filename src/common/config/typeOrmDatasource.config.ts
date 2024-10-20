import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

config({ path: `.env` });
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
};
