import { Body, Controller, Delete, Get, Param, Patch, NotFoundException, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Users } from './users.entity';

@Controller('users')
@Serialize(UserDto)
@Roles(Role.Admin)
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) { };

    @Get('/whoami')
    @Roles(Role.Student, Role.Admin)
    whoAmI(@CurrentUser() user: Users) {
        return user;
    };

    @Get(':id') // GET /users/:id
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        };
        return user;
    };

    @Get() // GET /users
    findAll() {
        return this.usersService.findAll();
    };

    @Patch(':id') // PATCH /users/:id
    @Roles(Role.Student, Role.Admin)
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto, @CurrentUser() user: Users) {
        return this.usersService.update(id, body, user.id);
    };

    @Delete(':id') // DELETE /users/:id
    @Roles(Role.Student, Role.Admin)
    deleteUser(@Param('id') id: string, @CurrentUser() user: Users) {
        return this.usersService.remove(id, user.id);
    };
}
