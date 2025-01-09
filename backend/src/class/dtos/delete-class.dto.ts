import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@ArgsType()
export class DeleteClassArgs {
  @Field(() => Int)
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsInt({ message: 'ID must be an integer' })
  id: number;
}