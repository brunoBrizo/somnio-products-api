import { dataSourceOptions } from '@config/typeOrmDatasource.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        const sslOptions = {
          ssl: isProduction,
          extra: { ssl: isProduction ? { rejectUnauthorized: false } : null },
        };

        return {
          ...sslOptions,
          ...dataSourceOptions,
          autoLoadEntities: true, // Dev purposes only
          //migrations: ['dist/migrations/*.js'],
          //migrationsRun: configService.get<string>('DB_MIGRATIONS_RUN') === 'true' ? true : false,
          synchronize: true, //configService.get<string>('DB_SYNCHRONIZE') === 'true' ? true : false,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
