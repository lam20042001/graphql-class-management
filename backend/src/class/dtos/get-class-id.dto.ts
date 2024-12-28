import { IsInt, IsNotEmpty } from 'class-validator';

export class GetClassByIdDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
