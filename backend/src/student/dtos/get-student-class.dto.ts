import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetStudentByClassArgs {
  @Field(() => String)
  @IsNotEmpty({ message: 'Class cannot be empty' })
  @IsString({ message: 'Class must be an integer' })
  className: string;
}