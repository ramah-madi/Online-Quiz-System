import { Entity,
         Column,
         PrimaryGeneratedColumn,
         AfterInsert,
         CreateDateColumn,
         ManyToOne,
         JoinColumn,
         OneToMany
} from 'typeorm';
import { Users } from '../users/users.entity';
import { Quizzes } from 'src/quizzes/quizzes.entity';
import { Options } from 'src/options/options.entity';
import { Responses } from 'src/responses/responses.entity';

@Entity()
export class Questions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    question_text: string;

    @Column({ type: 'enum', enum: ['multiple_choice', 'true_false'], default: 'multiple_choice' })
    question_type: string;

    @ManyToOne(() => Quizzes, (quiz) => quiz.questions)
    @JoinColumn({ name: 'quiz_id' })
    quiz: Quizzes;

    @Column()
    quiz_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Users, (user) => user.created_questions)
    @JoinColumn({ name: 'created_by' })
    created_by_User: Users;

    @Column()
    created_by: string;

    @Column('timestamp', { onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

    @ManyToOne(() => Users, (user) => user.updated_questions)
    @JoinColumn({ name: 'updated_by' })
    updated_by_user: Users;

    @Column({ nullable: true })
    updated_by: string;

    @OneToMany(() => Options, (option) => option.question)
    options: Options[];

    @OneToMany(() => Responses, (response) => response.question)
    responses: Responses[];

    @AfterInsert()
    afterInsert() {
        console.log('Inserted Question with id: ', this.id);
    }
}