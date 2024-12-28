import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('class')
@ObjectType()
export class Class {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;
  @Column({ nullable: false, type: 'varchar' })
  @Field(() => String)
  name: string;
  @OneToMany(() => Student, (student) => student.class)
  @Field(() => [Student], { nullable: true })
  students: Student[];
}
