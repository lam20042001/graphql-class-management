import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { ClassResolver } from './class.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  providers: [ClassService, ClassResolver],
})
export class ClassModule {
}
