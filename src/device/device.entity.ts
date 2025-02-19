import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @Column({ type: 'enum', enum: ['available', 'in-use', 'inactive'], default: 'available' })
  state!: 'available' | 'in-use' | 'inactive';

  @CreateDateColumn()
  createdAt!: Date;
}
