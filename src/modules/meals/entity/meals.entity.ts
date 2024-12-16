import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('Meals')
export class Meals {
  @ObjectIdColumn()
  _id: ObjectId; // MongoDB ObjectId, unique identifier for the document

  @Column({ type: 'varchar', length: 255 })
  title: string; // Title of the meal

  @Column({ type: 'date' })
  date: Date; // Date of the meal

  @Column({ type: 'json' })
  time: { start: string; end: string }; // Time object with start and end times

  @Column({ type: 'simple-array' })
  recipes: string[]; // Array to store recipes (currently empty)

  @Column({ type: 'text' })
  notes: string; // Notes about the meal

  @Column({ type: 'varchar', length: 255 })
  createdBy: string; // ID of the user who created this document

  @Column({ type: 'timestamp' })
  createdAt: Date; // Timestamp when the document was created

  @Column({ type: 'varchar', length: 255 })
  updatedBy: string; // ID of the user who last updated this document

  @Column({ type: 'timestamp' })
  updatedAt: Date; // Timestamp when the document was last updated
}
