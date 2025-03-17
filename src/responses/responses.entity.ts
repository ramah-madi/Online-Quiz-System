import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, AfterInsert, Column } from 'typeorm';
import { Users } from '../users/users.entity';
import { Quizzes } from '../quizzes/quizzes.entity';
import { Questions } from '../questions/questions.entity';
import { Options } from '../options/options.entity';

@Entity()
export class Responses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.responses)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column()
  user_id: string;

  @ManyToOne(() => Quizzes, (quiz) => quiz.responses)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quizzes;

  @Column()
  quiz_id: string;

  @ManyToOne(() => Questions, (question) => question.responses)
  @JoinColumn({ name: 'question_id' })
  question: Questions;

  @Column()
  question_id: string;

  @ManyToOne(() => Options, (option) => option.responses)
  @JoinColumn({ name: 'selected_option_id' })
  selected_option_obj: Options;

  @Column()
  selected_option_id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('timestamp', { onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.updated_responses, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by_user: Users;

  @Column({ nullable: true })
  updated_by: string;

  @ManyToOne(() => Users, (user) => user.created_responses)
  @JoinColumn({ name: 'created_by' })
  created_by_user: Users;

  @Column()
  created_by: string;

  @AfterInsert()
  afterInsert() {
      console.log('Inserted response with id: ', this.id);
  }
}