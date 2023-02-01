export interface User {
    id: number;
    uuid: string;
    token: string;
    photoUrl: string;
    knownAs: string;
    gender: string;
    roles: string[];
}