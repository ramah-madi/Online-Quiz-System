import { Injectable, NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scores } from './scores.entity';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class ScoresService {
    constructor(
        @InjectRepository(Scores) private scoresRepo: Repository<Scores>,
        private usersService: UsersService,
        private quizzesService: QuizzesService,
    ) {}

    async create(quiz_id: string, score: number, userId: string, currentuserId: string) {
        const quiz = await this.quizzesService.findOne(quiz_id);
        const user = await this.usersService.findOne(userId);
        if (!quiz) {
            throw new NotFoundException('Quiz not found');
        }

        if (!user) {
            throw new NotFoundException('User not found');
        }
        const newScore = this.scoresRepo.create({
            quiz_id,
            score,
            user_id: userId,
            created_by: currentuserId
        });
        return this.scoresRepo.save(newScore);

    }

    async findAll(userId: string) {
        return this.scoresRepo.find({where: { created_by: userId }});
    }

    async findOne(id: string){
        const score = await this.scoresRepo.findOne({ where: { id }});
        if (!score) {
            throw new NotFoundException('Score not found');
        }
        return score;
    }

    async findByUser(user_id: string){
        return this.scoresRepo.find({ where: { user_id: user_id }  });
    }

    async findByQuiz(quiz_id: string){
        return this.scoresRepo.find({ where: { quiz_id: quiz_id  }});
    }

    async getQuizStatistics(quizId: string) {
        const result = await this.scoresRepo
          .createQueryBuilder('scores')
          .select([
            'MAX(scores.score) AS maxScore',
            'MIN(scores.score) AS minScore',
            'AVG(scores.score) AS avgScore'
          ])
          .where('scores.quiz_id = :quizId', { quizId })
          .getRawOne();
        return {
            quiz_id: quizId,
            maxScore: result.maxScore !== null ? Number(result.maxScore) : null,
            minScore: result.minScore !== null ? Number(result.minScore) : null,
            avgScore: result.avgScore !== null ? Number(parseFloat(result.avgScore).toFixed(2)) : null,
          };
      }

    async update(id: string, newScore: number, userId: string){
        const score = await this.findOne(id);
        if (!score) {
            throw new NotFoundException('Score not found');
        };
        Object.assign(score, {score: newScore, updated_by: userId});
        return this.scoresRepo.save(score);
    }

    async remove(id: string){
        const score = await this.findOne(id);
        await this.scoresRepo.remove(score);
        return { message: 'Score deleted successfully' };
    }
}
