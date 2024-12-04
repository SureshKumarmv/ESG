import {
    Entity,
    // OneToMany,
    DeleteDateColumn,
    ManyToOne,
    Column,
    JoinColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"
// import { DefraEmission } from "./DefraEmission.entity"
// import { Activity } from "./Activity.entity"
import { MobileActivityDefra } from "./MobileActivityDefra.entity"

@Entity({ name: "Mobile_Vehicle_Defra" })
export class MobileVehicleDefra extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false, unique: true })
    name: string

    @Column({ name: "activityId" })
    activityId: string

    @ManyToOne(() => MobileActivityDefra, (activity) => activity.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "activityId" })
    activity: MobileActivityDefra

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
