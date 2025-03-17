import { Entity,
         Column,
         PrimaryGeneratedColumn,
         AfterInsert,
         ManyToOne,
         JoinColumn,
         CreateDateColumn,
         OneToMany }
from 'typeorm';
import { Users } from '../users/users.entity';
import { Questions } from 'src/questions/questions.entity';
import { Responses } from 'src/responses/responses.entity';
import { Scores } from 'src/scores/scores.entity';

@Entity()
export class Quizzes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Users, (user) => user.created_quizzes)
    @JoinColumn({ name: 'created_by' })
    created_by_user: Users;

    @Column()
    created_by: string;

    @Column('timestamp', { onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;

    @ManyToOne(() => Users, (user) => user.updated_quizzes)
    @JoinColumn({ name: 'updated_by' })
    updated_by_user: Users;

    @Column({ nullable: true })
    updated_by: string;

    @OneToMany(() => Questions, question => question.quiz)
    questions: Questions[];

    @OneToMany(() => Responses, response => response.quiz)
    responses: Responses[];

    @OneToMany(() => Scores, score => score.quiz)
    scores: Scores[];

    @AfterInsert()
    afterInsert() {
        console.log('Inserted Quiz with id: ', this.id);
    }
}
