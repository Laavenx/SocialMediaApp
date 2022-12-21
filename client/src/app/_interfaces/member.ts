import { Photo } from "./photo";

export interface Member {
    id: number;
    userName: string;
    photoUrl: string;
    createdAt: Date;
    lastActive: Date;
    age: number;
    introduction: string;
    gender: string;
    city: string;
    knownAs: string;
    lookingFor: string;
    interests: string;
    country: string;
    photos: Photo[];
}