import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Class } from './entities/class.entity';
import { ClassService } from './class.service';

@Resolver(() => Class)
export class ClassResolver {
  constructor(private readonly classService: ClassService) {
  }

  @Query(() => [Class])
  async getAllClasses() {
    return this.classService.getAllClasses();
  }

  @Query(() => Class)
  async getClassById(@Args('id', { type: () => Int }) id: number) {
    return this.classService.getClassById(id);
  }

  @Mutation(() => Class)
  async createClass(@Args('name') name: string) {
    return this.classService.createClass({ name });
  }

  @Mutation(() => Class)
  async updateClass(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
  ) {
    return this.classService.updateClass(id, { name });
  }

  @Mutation(() => Class)
  async deleteClass(@Args('id', { type: () => Int }) id: number) {
    return this.classService.deleteClass(id);
  }
}
