import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quizzes } from './quizzes.entity';
import { Users } from 'src/users/users.entity';

@Injectable()
export class QuizzesService {
    constructor(
        @InjectRepository(Quizzes) private quizzesRepo: Repository<Quizzes>,
    ) {};

    create(userId: string, attrs: Partial<Quizzes>) {
        const quiz = this.quizzesRepo.create(attrs);
        quiz.created_by = userId;
        return this.quizzesRepo.save(quiz);
    };

    findAll(userId: string) {
        return this.quizzesRepo.find({
            where: { created_by: userId }
        });
    };

    async findOne(id: string) {
        const quiz = await this.quizzesRepo.findOne({ where: { id }});
        return quiz;
    };

    async update(id: string, attrs: Partial<Quizzes>, userId: string) {
        const quiz = await this.findOne(id);
        if (!quiz) {
            throw new NotFoundException('user not found');
        };
        Object.assign(quiz, attrs, { updated_by: userId });
        return this.quizzesRepo.save(quiz);
    };

    async remove(id: string) {
        const quiz = await this.findOne(id);
        if (!quiz) {
            throw new NotFoundException('user not found');
        };
        return this.quizzesRepo.remove(quiz);
    };
};
