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
import { Questions } from 'src/questions/questions.entity';
import { Responses } from 'src/responses/responses.entity';

@Entity()
export class Options {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    option_text: string;

    @Column()
    is_correct: boolean;

    @ManyToOne(() => Questions, (question) => question.options)
    @JoinColumn({ name: 'question_id' })
    question: Questions;

    @Column()
    question_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Users, (user) => user.created_options)
    @JoinColumn({ name: 'created_by' })
    created_by_user: Users;

    @Column()
    created_by: string;

    @Column('timestamp', { onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

    @ManyToOne(() => Users, (user) => user.updated_options, { nullable: true })
    @JoinColumn({ name: 'updated_by' })
    updated_by_user: Users;

    @Column({ nullable: true})
    updated_by: string;

    @OneToMany(() => Responses, (response) => response.selected_option_obj)
    responses: Responses[];

    @AfterInsert()
    afterInsert() {
        console.log('Inserted Option with id: ', this.id);
    }
}