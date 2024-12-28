import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteStudentDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
