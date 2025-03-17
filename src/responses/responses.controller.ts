import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Patch } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { Users } from 'src/users/users.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { SubmitResponseDto } from './dtos/submit-response.dto';
import { UpdateResponseDto } from './dtos/update-response.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('responses')
@Roles(Role.Admin)
@UseGuards(RolesGuard)
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  // POST /responses - Submit a response (student only)
  @Post()
  @Roles(Role.Student)
  submitResponse(@CurrentUser() user: Users, @Body() body: SubmitResponseDto) {
    return this.responsesService.submitResponse(user.id, body.quiz_id, body.question_id, body.selected_option_id);
  }

  // GET /responses/:id - Get a specific response
  @Get(':id')
  getResponse(@Param('id') id: string) {
    return this.responsesService.findOne(id);
  }

  // GET /users/:user_id/responses - Get all responses by a specific user student (admin only)
  @Get('users/:user_id')
  getResponsesByUser(@Param('user_id') userId: string) {
    return this.responsesService.findByUser(userId);
  }

  // GET /quizzes/:quiz_id/responses - Get all responses for a specific quiz
  @Get('quizzes/:quiz_id')
  getResponsesByQuiz(@Param('quiz_id') quizId: string) {
    return this.responsesService.findByQuiz(quizId);
  }

  // PATCH /responses/:id - Update a response (admin only)
  @Patch(':id')
  updateResponse(@Param('id') id: string, @Body() body: UpdateResponseDto) {
    return this.responsesService.update(id, body.quiz_id, body.question_id, body.selected_option_id);
  }

  // DELETE /responses/:id - Delete a response (admin only)
  @Delete(':id')
  deleteResponse(@Param('id') id: string) {
    return this.responsesService.remove(id);
  }
}
