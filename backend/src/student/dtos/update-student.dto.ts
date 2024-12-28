import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  className?: string;
}
