/**
 * 队伍类别
 */
import {UserType} from "./user";

export type TeamType = {
    id: number;
    description: string,
    expireTime?: Date,
    maxNum: 3,
    name: string,
    password?: string,
    status: number,
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
};