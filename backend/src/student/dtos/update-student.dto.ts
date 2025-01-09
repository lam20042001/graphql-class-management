import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateStudentInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsInt({ message: 'ID must be an integer' })
  id: number;

  @Field(() => String, { nullable: true })
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString({ message: 'Class name must be a string' })
  @IsOptional()
  className?: string;
}
