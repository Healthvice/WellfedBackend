import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('OnlineUsers')
export class OnlineUsers {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'varchar', length: 255 })
  userId: string; // ID of the user associated with the status

  @Column({ type: 'timestamp' })
  lastSeen: Date; // Timestamp of the last seen activity
}
