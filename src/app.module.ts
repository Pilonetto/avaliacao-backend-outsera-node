import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwardsModule } from './awards/awards.module';
import { Movie } from './awards/entities/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [Movie],
      synchronize: true,
    }),
    AwardsModule,
  ],
})
export class AppModule {}
