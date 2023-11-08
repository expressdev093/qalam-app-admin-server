import { DataSource } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
config();
export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
  synchronize: false,
});
