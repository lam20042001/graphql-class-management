import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Class } from './entities/class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {
  }

  async getAllClasses(): Promise<Class[]> {
    return this.classRepository.find({ relations: ['students'] });
  }

  async getClassById(id: number): Promise<Class> {
    const exitedClass: Class = await this.classRepository.findOne({
      where: { id },
      relations: ['students'],
    });
    if (!exitedClass) {
      throw new NotFoundException(`Class ${id} not found`);
    }
    return exitedClass;
  }

  async updateClass(id: number, updateData: { name?: string }): Promise<Class> {
    const exitedClass: Class = await this.classRepository.findOne({
      where: { id: id },
    });
    if (!exitedClass) {
      throw new NotFoundException(`Class ${id} not found`);
    }
    const exitedName: Class = await this.classRepository.findOne({
      where: { name: updateData.name },
    });
    if (exitedName && exitedName.id !== id) {
      throw new BadRequestException(`Class ${updateData.name} already exists`);
    }
    if (updateData.name) exitedClass.name = updateData.name;
    return await this.classRepository.save(exitedClass);
  }

  async createClass(createData: { name: string }): Promise<Class> {
    const exitedName: Class = await this.classRepository.findOne({
      where: { name: createData.name },
    });
    if (exitedName) {
      throw new BadRequestException(`Class ${createData.name} already exists`);
    }
    const newClass = this.classRepository.create({
      name: createData.name,
    });
    return await this.classRepository.save(newClass);
  }

  async deleteClass(id: number): Promise<Class> {
    const exitedClass: Class = await this.classRepository.findOne({
      where: { id: id },
      relations: ['students'],
    });
    if (!exitedClass) {
      throw new NotFoundException(`Class ${id} not found`);
    }
    if (exitedClass.students.length > 0) {
      throw new BadRequestException(`Class ${id} has students`);
    }
    return await this.classRepository.remove(exitedClass);
  }
}
