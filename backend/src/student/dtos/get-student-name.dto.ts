import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetStudentByNameArgs {
  @Field(() => String)
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name must be an integer' })
  name: string;
}