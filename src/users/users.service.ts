import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private repo: Repository<Users>) { };

    async findOne(id: string) {
        if (!id) {
            return null;
        };

        return this.repo.findOne({ where: { id } });
    };

    findByEmail(email: string) {
        return this.repo.find({ where: { email } });
    };

    findAll() {
        return this.repo.find();
    };

    create(email: string, password: string, username: string) {
        const user = this.repo.create({
            email,
            password,
            username
        });
        return this.repo.save(user);
    };

    async update(id: string, attrs: Partial<Users>, userId: string) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        if (user.id !== userId) {
            throw new MethodNotAllowedException('Not Authorized to update another user');
        }
        Object.assign(user, attrs, { updated_by: userId });
        return this.repo.save(user);
    };

    async remove(id: string, userId: string) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        };
        if (user.id !== userId) {
            throw new MethodNotAllowedException('Not Authorized to update another user');
        };
        await this.repo.remove(user);
        return user;
    };
}
