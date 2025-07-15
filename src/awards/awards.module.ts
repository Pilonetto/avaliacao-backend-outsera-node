import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [AwardsController],
  providers: [AwardsService],
})
export class AwardsModule {}
