import {
    Table,
    Column,
    Model,
    Unique,
    Comment,
    DataType,
    Default,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
} from "sequelize-typescript";
import { User } from "./user";

@Table
export class RefreshToken extends Model {
    @Comment("식별자")
    @PrimaryKey
    @AutoIncrement
    @Column
    id: bigint;

    @Comment("사용자 식별자")
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: bigint;

    @Comment("토큰값")
    @AllowNull(false)
    @Column(DataType.TEXT)
    tokenValue: string;

    @Comment("사용여부")
    @AllowNull(false)
    @Default(true)
    @Column
    useYn: boolean;
}
