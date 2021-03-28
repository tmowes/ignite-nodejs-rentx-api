import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

export const categoryTableName = 'categories'

@Entity(categoryTableName)
export class Category {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date


  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
