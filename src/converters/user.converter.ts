import type {
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore';
import { hashPassword, getUniqueId } from '../utils/hash.util';

interface IUser {
  teamId: string;
  email: string;
  password: string;
  memberCount: 1 | 2;
  p1Name: string;
  p2Name: string;
  admin: boolean;
}

export class User implements IUser {
  memberCount: 1 | 2;
  admin: boolean = false;

  constructor(
    public teamId: string,
    public email: string,
    public password: string,
    public p1Name: string,
    public p2Name: string = '',
  ) {
    this.memberCount = p2Name ? 2 : 1;
  }

  verifyPassword(candidate: string) {
    return this.password === hashPassword(candidate);
  }
}

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return {
      teamId: getUniqueId(user.teamId),
      email: user.email,
      password: hashPassword(user.password),
      p1Name: user.p1Name,
      p2Name: user.p2Name,
      memberCount: user.memberCount,
      admin: user.admin,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<IUser>): User {
    const { teamId, email, password, p1Name, p2Name } = snapshot.data();
    return new User(teamId, email, password, p1Name, p2Name);
  },
};
