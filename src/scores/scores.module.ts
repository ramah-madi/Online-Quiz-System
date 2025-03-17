import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scores } from './scores.entity';
import { UsersModule } from '../users/users.module';
import { QuizzesModule } from '../quizzes/quizzes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Scores]), UsersModule, QuizzesModule],
  controllers: [ScoresController],
  providers: [ScoresService]
})
export class ScoresModule {}
