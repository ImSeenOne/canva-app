import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Canvas extends BaseEntity{
    
    @PrimaryColumn()
    id!: string

    @PrimaryColumn()
    user_id!: number

    @Column()
    pjson!: string

    @Column()
    name!: string

    @CreateDateColumn()
    create_date!: Date
}