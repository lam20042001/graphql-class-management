import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteClassDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
