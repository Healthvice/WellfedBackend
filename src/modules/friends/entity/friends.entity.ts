import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('UserFriends')
export class Friends {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'array', default: [] })
  friends: string[]; // Array of ObjectIds for friends

  @Column({ type: 'array', default: [] })
  blockedUsers: string[]; // Array of ObjectIds for blocked users

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Timestamp for when the user was created

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date; // Timestamp for when the user was last updated

  @Column({ type: 'varchar', length: 255 })
  clerkId: string; // ID associated with the user in the Clerk system
}
