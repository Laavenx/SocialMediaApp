import { Photo } from "./photo";

export interface Member {
    id: number;
    uuid: string;
    photoUrl: string;
    createdAt: Date;
    lastActive: Date;
    introduction: string;
    gender: string;
    city: string;
    knownAs: string;
    lookingFor: string;
    interests: string;
    country: string;
    isLiked: boolean;
    photos: Photo[];
}