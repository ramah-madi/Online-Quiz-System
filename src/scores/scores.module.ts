import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scores } from './scores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scores])],
  controllers: [ScoresController],
  providers: [ScoresService]
})
export class ScoresModule {}
