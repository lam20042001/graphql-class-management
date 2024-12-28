import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

@Resolver()
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {
  }

  @Query(() => [Student])
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Query(() => Student)
  async getStudentById(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.getStudentById(id);
  }

  @Query(() => [Student])
  async getStudentByName(@Args('name') name: string) {
    return this.studentService.getStudentByName(name);
  }

  @Query(() => [Student])
  async getStudentByClass(@Args('className') studentClass: string) {
    return this.studentService.getStudentByClass(studentClass);
  }

  @Mutation(() => Student)
  async createStudent(
    @Args('name') name: string,
    @Args('className') className: string,
  ) {
    return this.studentService.createStudent({ name, className });
  }

  @Mutation(() => Student)
  async updateStudent(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
    @Args('className') className: string,
  ) {
    return this.studentService.updateStudent(id, { name, className });
  }

  @Mutation(() => Student)
  async deleteStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.deleteStudent(id);
  }
}
