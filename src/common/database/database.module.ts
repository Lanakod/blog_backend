import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DbConfigAsync } from '../config/database.config';

@Module({
  imports: [SequelizeModule.forRootAsync(DbConfigAsync)],
})
export class DatabaseModule {}
