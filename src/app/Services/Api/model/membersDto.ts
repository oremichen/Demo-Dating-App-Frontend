import { PhotoDto } from "./photoDto";

export interface MembersDto {
    id?: number;
    name?: string;
    email?: string;
    dateCreated?: Date;
    dateOfBirth?: Date;
    knownAs?: string;
    lastAcvtive?: Date;
    gender?: string;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    city?: string;
    photo?: PhotoDto[];
}