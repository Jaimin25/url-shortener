import { User } from "../models/users";

const sessionIdToUserMap = new Map();

export function setUser(id: string, user: typeof User) {
    sessionIdToUserMap.set(id, user);
}

export function getUser(id: string) {
    return sessionIdToUserMap.get(id);
}
