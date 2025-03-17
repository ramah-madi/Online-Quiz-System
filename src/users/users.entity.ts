import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, OneToMany } from 'typeorm';
import { Quizzes } from '../quizzes/quizzes.entity';
import { Role } from 'src/auth/enums/role.enum';
import { Questions } from 'src/questions/questions.entity';
import { Options } from 'src/options/options.entity';
import { Responses } from 'src/responses/responses.entity';
import { Scores } from 'src/scores/scores.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column('enum', { enum: ['admin', 'student'], default: 'student' })
    role: Role;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column('uuid', { nullable: true })
    created_by: string;

    @Column('timestamp', { onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

    @Column('uuid', { nullable: true })
    updated_by: string;

    @OneToMany(() => Quizzes, quiz => quiz.created_by)
    created_quizzes: Quizzes[];

    @OneToMany(() => Quizzes, quiz => quiz.updated_by)
    updated_quizzes: Quizzes[];

    @OneToMany(() => Questions, question => question.created_by)
    created_questions: Questions[];

    @OneToMany(() => Questions, question => question.updated_by)
    updated_questions: Questions[];

    @OneToMany(() => Options, option => option.created_by_user)
    created_options: Options[];

    @OneToMany(() => Options, option => option.updated_by_user)
    updated_options: Options[];

    @OneToMany(() => Responses, response => response.user)
    responses: Responses[];

    @OneToMany(() => Responses, response => response.created_by_user)
    created_responses: Responses[];

    @OneToMany(() => Responses, response => response.updated_by_user)
    updated_responses: Responses[];

    @OneToMany(() => Scores, score => score.user)
    scores: Scores[];

    @OneToMany(() => Scores, score => score.created_by_user)
    created_scores: Scores[];

    @OneToMany(() => Scores, score => score.updated_by_user)
    updated_scores: Scores[];

    @AfterInsert()
    afterInsert() {
        console.log('Inserted User with id: ', this.id);
    }
}
