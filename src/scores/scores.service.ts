import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scores } from './scores.entity';
import { Users } from '../users/users.entity';
import { Quizzes } from '../quizzes/quizzes.entity';


@Injectable()
export class ScoresService {
    constructor(
        @InjectRepository(Scores) private scoresRepo: Repository<Scores>,
        // @InjectRepository(Users) private usersRepo: Repository<Users>,
        // @InjectRepository(Quizzes) private quizzesRepo: Repository<Quizzes>,
    ) {}

    async create(quiz_id: string, score: number, userId: string, currentuserId: string) {
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
