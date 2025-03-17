import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Patch } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dtos/create-score.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Users } from 'src/users/users.entity';
import { UpdateScoreDto } from './dtos/update-score.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('scores')
@Roles(Role.Admin)
@UseGuards(RolesGuard)
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  recordScore(@Body() body: CreateScoreDto, @CurrentUser() currentUser: Users) {
    return this.scoresService.create(body.quiz_id, body.score, body.user_id, currentUser.id);
  }

  @Get(':id')
  getScore(@Param('id') id: string) {
    return this.scoresService.findOne(id);
  }

  @Get('/users/:user_id')
  getUserScores(@Param('user_id') userId: string) {
    return this.scoresService.findByUser(userId);
  }

  @Get('quizzes/:quizId/statistics')
  async getQuizStatistics(@Param('quizId') quizId: string) {
    return await this.scoresService.getQuizStatistics(quizId);
  }

  @Get('/quizzes/:quiz_id')
  getQuizScores(@Param('quiz_id') quizId: string) {
    return this.scoresService.findByQuiz(quizId);
  }

  @Get()
  getAllScores(@CurrentUser() user: Users) {
    return this.scoresService.findAll(user.id);
  }

  @Patch(':id')
  updateScore(@Param('id') id: string, @Body() body: UpdateScoreDto, @CurrentUser() user: Users) {
    return this.scoresService.update(id, body.score, user.id);
  }

  @Delete(':id')
  deleteScore(@Param('id') id: string) {
    return this.scoresService.remove(id);
  }
}
