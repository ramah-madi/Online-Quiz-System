import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questions } from './questions.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { Users } from 'src/users/users.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Questions) private questionsRepo: Repository<Questions>,
        private readonly quizzesService: QuizzesService
    ) {}

    async create(body: CreateQuestionDto, userId: string) {
        const { quiz_id, question_text, question_type } = body;

        const quiz = await this.quizzesService.findOne(quiz_id);
        if (!quiz) {
            throw new NotFoundException('Quiz not found');
        }

        const question = this.questionsRepo.create({
            question_text,
            question_type: question_type || 'multiple_choice',
            quiz,
            created_by: userId
        });

        return this.questionsRepo.save(question);
    }

    async findAll(userId: string) {
        return this.questionsRepo.find({
            where: { created_by: userId  }
        });
    }

    async findOne(id: string){
        const question = await this.questionsRepo.findOne({ where: { id } });

        if (!question) {
            throw new NotFoundException('Question not found');
        };
        return question;
    }

    async findQuestionsByQuizId(quizId: string) {
        const questions = await this.questionsRepo.find({
          where: { quiz_id: quizId }
        });

        return questions;
      }

    async update(id: string, userId: string, attrs: Partial<Questions>) {
        const question = await this.questionsRepo.findOne({ where: { id } });
        if (!question) {
            throw new NotFoundException('Question not found');
        };

        Object.assign(question, attrs, { updated_by: userId});
        return this.questionsRepo.save(question);
    }

    async remove(id: string) {
        const question = await this.questionsRepo.findOne({ where: { id } });
        if (!question) {
            throw new NotFoundException('Question not found');
        };

        return this.questionsRepo.remove(question);
    }
}
