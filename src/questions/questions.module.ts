import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './questions.entity';
import { QuizzesModule } from 'src/quizzes/quizzes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Questions]), QuizzesModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
