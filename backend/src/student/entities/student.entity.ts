import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../../class/entities/class.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('student')
@ObjectType()
export class Student {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  @Field(() => String)
  name: string;

  @ManyToOne(() => Class)
  @JoinColumn({ name: 'classid' })
  @Field(() => Class, { nullable: true })
  class: Class;
}
