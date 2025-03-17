import { Entity,
         PrimaryGeneratedColumn,
         ManyToOne,
         JoinColumn,
         CreateDateColumn,
         AfterInsert,
         Column
} from 'typeorm';
import { Users } from '../users/users.entity';
import { Quizzes } from '../quizzes/quizzes.entity';

@Entity()
export class Scores {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.scores)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column()
  user_id: string;

  @ManyToOne(() => Quizzes, (quiz) => quiz.scores)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quizzes;

  @Column()
  quiz_id: string;

  @Column()
  score: number;

  @CreateDateColumn()
  created_at: Date;

  @Column('timestamp', { onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.updated_scores, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by_user: Users;

  @Column({ nullable: true })
  updated_by: string;

  @ManyToOne(() => Users, (user) => user.created_scores)
  @JoinColumn({ name: 'created_by' })
  created_by_user: Users;

  @Column()
  created_by: string;

  @AfterInsert()
  afterInsert() {
      console.log('Inserted score with id: ', this.id);
  }
}