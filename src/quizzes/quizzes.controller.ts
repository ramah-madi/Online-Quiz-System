import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { UpdateQuizDto } from './dtos/update-quiz.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Users } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuizDto } from './dtos/quiz.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { UseGuards } from '@nestjs/common';

@Controller('quizzes')
@Serialize(QuizDto)
@Roles(Role.Admin)
@UseGuards(RolesGuard)
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  createQuiz(@CurrentUser() user: Users, @Body() body: CreateQuizDto) {
    return this.quizzesService.create(user.id, body);
  }

  @Get()
  findAllQuizzes(@CurrentUser() user: Users) {
    return this.quizzesService.findAll(user.id);
  }

  @Get(':id')
  @Roles(Role.Student, Role.Admin)
  find(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }

  @Patch(':id')
  updateQuiz(@Param('id') id: string, @Body() body: UpdateQuizDto, @CurrentUser() user: Users) {
    return this.quizzesService.update(id, body, user.id);
  }

  @Delete(':id')
  deleteQuiz(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
}
