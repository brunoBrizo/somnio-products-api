import { Module } from '@nestjs/common';
import { ProductsModule } from '@products/products.module';
import { DatabaseModule } from '@database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchemaConfig } from '@config/validationSchema.config';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from '@filters/custom-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema: validationSchemaConfig, isGlobal: true }),
    DatabaseModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
