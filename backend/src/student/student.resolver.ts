import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { GetStudentByIdArgs } from './dtos/get-student-id.dto';
import { GetStudentByNameArgs } from './dtos/get-student-name.dto';
import { GetStudentByClassArgs } from './dtos/get-student-class.dto';
import { CreateStudentInput } from './dtos/create-student.dto';
import { UpdateStudentInput } from './dtos/update-student.dto';
import { DeleteStudentArgs } from './dtos/delete-student.dto';
import ArgsType = jest.ArgsType;


@Resolver()
@UseGuards(RolesGuard)
@Roles('admin')
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {
  }

  @Roles('principal')
  @Query(() => [Student])
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Roles('principal')
  @Query(() => Student)
  async getStudentById(@Args() { id }: GetStudentByIdArgs) {
    return this.studentService.getStudentById(id);
  }

  @Roles('principal')
  @Query(() => [Student])
  async getStudentByName(@Args() { name }: GetStudentByNameArgs) {
    return this.studentService.getStudentByName(name);
  }

  @Roles('principal')
  @Query(() => [Student])
  async getStudentByClass(@Args() { className }: GetStudentByClassArgs) {
    return this.studentService.getStudentByClass(className);
  }

  @Mutation(() => Student)
  async createStudent(@Args('input') { name, className }: CreateStudentInput) {
    return this.studentService.createStudent({ name, className });
  }

  @Roles('teacher')
  @Mutation(() => Student)
  async updateStudent(
    @Args('input') { id, name, className }: UpdateStudentInput,
  ) {
    return this.studentService.updateStudent(id, { name, className });
  }

  @Mutation(() => Student)
  async deleteStudent(@Args() { id }: DeleteStudentArgs) {
    return this.studentService.deleteStudent(id);
  }
}
