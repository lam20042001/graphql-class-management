import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Class } from './entities/class.entity';
import { ClassService } from './class.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { GetClassByIdInput } from './dtos/get-class-id.dto';
import { CreateClassInput } from './dtos/create-class.dto';
import { UpdateClassInput } from './dtos/update-class.dto';
import { DeleteClassArgs } from './dtos/delete-class.dto';

@Resolver(() => Class)
@UseGuards(RolesGuard)
@Roles('admin')
export class ClassResolver {
  constructor(private readonly classService: ClassService) {
  }

  @Roles('principal', 'teacher')
  @Query(() => [Class])
  async getAllClasses() {
    return this.classService.getAllClasses();
  }

  @Roles('principal', 'teacher')
  @Query(() => Class)
  async getClassById(@Args() { id }: GetClassByIdInput) {
    return this.classService.getClassById(id);
  }

  @Roles('principal')
  @Mutation(() => Class)
  async createClass(@Args('input') { name }: CreateClassInput) {
    return this.classService.createClass({ name });
  }

  @Roles('principal')
  @Mutation(() => Class)
  async updateClass(
    @Args('input') { id, name }: UpdateClassInput) {
    return this.classService.updateClass(id, { name });
  }

  @Roles('principal')
  @Mutation(() => Class)
  async deleteClass(@Args() { id }: DeleteClassArgs) {
    return this.classService.deleteClass(id);
  }
}
