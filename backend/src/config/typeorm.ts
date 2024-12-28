import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Class } from '../class/entities/class.entity';
import { Student } from '../student/entities/student.entity';

const config = {
  type: 'postgres',
  host: `localhost`,
  port: `5432`,
  username: `postgres`,
  password: `1`,
  database: `class-management`,
  entities: [Student, Class],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
