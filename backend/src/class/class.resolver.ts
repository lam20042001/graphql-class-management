import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Class } from './entities/class.entity';
import { ClassService } from './class.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

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
  async getClassById(@Args('id', { type: () => Int }) id: number) {
    return this.classService.getClassById(id);
  }

  @Roles('principal')
  @Mutation(() => Class)
  async createClass(@Args('name') name: string) {
    return this.classService.createClass({ name });
  }

  @Roles('principal')
  @Mutation(() => Class)
  async updateClass(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
  ) {
    return this.classService.updateClass(id, { name });
  }

  @Roles('principal')
  @Mutation(() => Class)
  async deleteClass(@Args('id', { type: () => Int }) id: number) {
    return this.classService.deleteClass(id);
  }
}
