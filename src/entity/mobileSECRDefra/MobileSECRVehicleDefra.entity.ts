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
import { MobileSECRActivityDefra } from "./MobileSECRActivityDefra.entity"

@Entity({ name: "Mobile_SECR_Vehicle_Defra" })
export class MobileSECRVehicleDefra extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false, unique: true })
    name: string

    @Column({ name: "activityId" })
    activityId: string

    @ManyToOne(() => MobileSECRActivityDefra, (activity) => activity.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "activityId" })
    activity: MobileSECRActivityDefra

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
