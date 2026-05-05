import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Node } from '../../node/entities/node.entity';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn('increment')
  readingId: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  time: Date;

  @ManyToOne(() => Node, node => node.readings, { nullable: false })
  @JoinColumn({ name: 'nodeId' })
  node: Node;

  @Column({ nullable: false })
  nodeId: number;

  @Column({ type: 'decimal', nullable: false })
  value: number;
}
