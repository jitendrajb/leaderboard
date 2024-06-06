import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username']) // Add unique constraint for username
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // Username cannot be null
  username: string;

  @Column({ nullable: false }) // Password cannot be null
  password: string;

  @Column()
  role: string; // 'admin' or 'user'
}
