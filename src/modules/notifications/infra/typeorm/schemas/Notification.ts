import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
class Notification {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  content: string

  @Column({ type: 'uuid', name: 'recipient_id' })
  recipientId: string

  @Column({ default: false })
  read: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Notification
