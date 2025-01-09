import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetClassByIdInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsInt({ message: 'ID must be an integer' })
  id: number;
}