import type {
  DocumentData,
  QueryDocumentSnapshot,
  FirestoreDataConverter,
} from 'firebase-admin/firestore';
import { getHash } from '../common/utils';

interface IUser {
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
    public email: string,
    public password: string,
    public p1Name: string,
    public p2Name: string = '',
  ) {
    this.memberCount = p2Name ? 2 : 1;
  }

  verifyPassword(candidate: string) {
    return this.password === getHash(candidate);
  }

  static converter: FirestoreDataConverter<User> = {
    toFirestore(user: User): DocumentData {
      return {
        email: user.email,
        password: getHash(user.password),
        p1Name: user.p1Name,
        p2Name: user.p2Name,
        memberCount: user.memberCount,
        admin: user.admin,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<IUser>): User {
      const { email, password, p1Name, p2Name, admin } = snapshot.data();
      const newUser = new User(email, password, p1Name, p2Name);
      newUser.admin = admin;
      return newUser;
    },
  };
}
