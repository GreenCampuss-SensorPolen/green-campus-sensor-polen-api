import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../userData/entities/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('increment')
  notificationId: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  time?: Date;

  @ManyToOne(() => User, user => user.notifications, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false, default: false })
  sendEmail?: boolean;

  @Column({ nullable: false, default: false })
  read?: boolean;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;
}
