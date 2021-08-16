import { PhotoDto } from "./photoDto";

export interface Members {
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
    age?: number;
    photoUrl?: string;
    photo?: PhotoDto[];
}

