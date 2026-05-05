import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Reading } from '../../reading/entities/reading.entity';

@Entity()
export class Node {
  @PrimaryGeneratedColumn('increment')
  nodeId: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  time: Date;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
  battery: number;

  @Column({ nullable: false })
  location: string;

  @Column({ nullable: false })
  building: string;

  @Column({ nullable: false })
  floor: string;

  @OneToMany(() => Reading, reading => reading.nodeId)
  readings: Reading[];
}
