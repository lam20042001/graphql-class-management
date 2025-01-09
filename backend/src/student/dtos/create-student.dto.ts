import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @Field(() => String)
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @Field(() => String)
  @IsString({ message: 'Class name must be a string' })
  @IsNotEmpty({ message: 'Class name cannot be empty' })
  className: string;
}