import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dtos/create-option.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Users } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { OptionDto } from './dtos/option.dto';
import { UpdateOptionDto } from './dtos/update-option.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('options')
@Serialize(OptionDto)
@Roles(Role.Admin)
@UseGuards(RolesGuard)
export class OptionsController {
  constructor(private optionsService: OptionsService) { }

  @Post()
  createOption(@Body() body: CreateOptionDto, @CurrentUser() user: Users) {
    return this.optionsService.create(body, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionsService.findOne(id);
  }

  @Get('/questions/:question_id')
  findByQuestion(@Param('question_id') question_id: string) {
    return this.optionsService.findByQuestion(question_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateOptionDto, @CurrentUser() user: Users) {
    return this.optionsService.update(id, body.option_text, body.is_correct, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionsService.remove(id);
  }
}
