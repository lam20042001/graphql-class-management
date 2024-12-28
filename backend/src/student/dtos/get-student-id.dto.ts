import { IsInt, IsNotEmpty } from 'class-validator';

export class GetStudentByIdDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
