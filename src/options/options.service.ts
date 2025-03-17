import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Options } from './options.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { CreateOptionDto } from './dtos/create-option.dto';
import { Users } from 'src/users/users.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Options) private optionsRepo: Repository<Options>,
    private questionsService: QuestionsService,
  ) {}

  async create(body: CreateOptionDto, user: Users) {
    const { question_id, option_text, is_correct } = body;
    const question = await this.questionsService.findOne(question_id);
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const option = this.optionsRepo.create({ question,
                                             option_text,
                                             is_correct,
                                             created_by_user: user,
                                             created_by: user.id,
                                             updated_by: user.id,
                                            });
    return this.optionsRepo.save(option);
  }

  async findOne(id: string){
    const option = await this.optionsRepo.findOne({ where: { id } });
    if (!option) {
        throw new NotFoundException('Option not found');
    };
    return option;
  }

  async findByQuestion(question_id: string) {
    const question = await this.questionsService.findOne(question_id);
    if (!question) {
        throw new NotFoundException('Question not found');
    }

    return this.optionsRepo.find({ where: { question: { id: question_id } } });
  }

  async update(id: string, option_text: string, is_correct: boolean, user: Users) {
    const option = await this.findOne(id);
    if (!option) {
        throw new NotFoundException('Option not found');
    };

    option.option_text = option_text;
    option.is_correct = is_correct;
    option.updated_by = user.id;

    return this.optionsRepo.save(option);
  }

  async remove(id: string) {
    const option = await this.findOne(id);
    if (!option) {
        throw new NotFoundException('Option not found');
    };

    return this.optionsRepo.remove(option);}
}

