import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Responses } from './responses.entity';


@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Responses)
    private readonly responsesRepository: Repository<Responses>
  ) {}

  // Submit a response (student only)
  async submitResponse(userId: string, quiz_id:string, question_id:string, selected_option_id:string) {
    const response = this.responsesRepository.create({
        quiz_id,
        question_id,
        selected_option_id,
        user_id: userId,
        created_by: userId,
    });
    return await this.responsesRepository.save(response);
  }


  // Get a specific response by ID
  async findOne(id: string) {
    const response = await this.responsesRepository.findOne({ where: { id } });
    if (!response) {
      throw new NotFoundException('Response not found');
    }
    return response;
  }

  // Get all responses by a specific user
  async findByUser(userId: string) {
    return await this.responsesRepository.find({ where: { user_id: userId }});
  }

  // Get all responses for a specific quiz
  async findByQuiz(quizId: string) {
    return await this.responsesRepository.find({ where: { quiz_id: quizId } });
  }

  // Update a response (admin only)
  async update(id: string, quiz_id: string, question_id: string, selected_option_id: string) {
    const response = await this.responsesRepository.findOne({ where: { id } });
    if (!response) {
      throw new NotFoundException('Response not found');
    }
    Object.assign(response, { quiz_id, question_id, selected_option_id });
    return await this.responsesRepository.save(response);
  }

  // Delete a response (admin only)
  async remove(id: string) {
    const response = await this.responsesRepository.findOne({ where: { id } });
    if (!response) {
      throw new NotFoundException('Response not found');
    }
    return "Response deleted successfully";
  }
}
