import { Controller, Post, Get, Param, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Users } from '../users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuestionDto } from './dtos/question.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('questions')
@Serialize(QuestionDto)
@Roles(Role.Admin)
@UseGuards(RolesGuard)
export class QuestionsController {
    constructor(private questionsService: QuestionsService) {}

    @Post()
    createQuestion(@Body() body: CreateQuestionDto, @CurrentUser() user: Users) {
        return this.questionsService.create(body, user.id);
    }

    @Get(':quiz_id/questions')
    @Roles(Role.Student, Role.Admin)
    async getQuestionsByQuizId(@Param('quiz_id') quizId: string){
      return this.questionsService.findQuestionsByQuizId(quizId);
    }

    @Get('/:id')
    findQuestion(@Param('id') id: string) {
        return this.questionsService.findOne(id);
    }

    @Get()
    findAllQuestions(@CurrentUser() user: Users) {
        return this.questionsService.findAll(user.id);
    }

    @Patch('/:id')
    updateQuestion(@Param('id') id: string, @CurrentUser() user: Users, @Body() body: UpdateQuestionDto) {
        return this.questionsService.update(id, user.id, body);
    }

    @Delete('/:id')
    deleteQuestion(@Param('id') id: string) {
        return this.questionsService.remove(id);
    }
  }

