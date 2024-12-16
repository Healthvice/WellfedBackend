import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('FriendRequests')
export class FriendRequests {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'varchar', length: 255 })
  fromUser: string; // The user sending the request

  @Column({ type: 'varchar', length: 255 })
  toUser: string; // The user receiving the request

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status: string; // Status of the request: 'pending', 'accepted', or 'rejected'

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // Timestamp for when the request was created

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // Timestamp for when the request was last updated
}
