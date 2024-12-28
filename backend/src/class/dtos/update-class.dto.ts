import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateClassDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  name?: string;
}
