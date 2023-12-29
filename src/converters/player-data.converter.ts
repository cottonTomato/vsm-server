import type {
  DocumentData,
  QueryDocumentSnapshot,
  FirestoreDataConverter,
} from 'firebase-admin/firestore';

interface IPlayerData {
  balance: number;
  valuation: number;
  debt: number;
  total: number;
}

export const PlayerDataConverter: FirestoreDataConverter<IPlayerData> = {
  toFirestore(playerData: IPlayerData): DocumentData {
    return playerData;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<IPlayerData>): IPlayerData {
    return snapshot.data();
  },
};