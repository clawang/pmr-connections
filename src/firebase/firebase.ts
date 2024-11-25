import { collection, doc, addDoc, query, where, DocumentReference, DocumentData, FirestoreError, QueryDocumentSnapshot, SnapshotOptions, getCountFromServer, getAggregateFromServer, average } from 'firebase/firestore';
import { database } from "./config";
import { GameHistory, GameItem } from '../app/types';

const dbInstance = collection(database, 'plays');
const shareDb = collection(database, 'shares');

export async function addGame(
    mistakesLeft: number,
    timeCompleted: Date,
): Promise<{ result: DocumentReference, error: FirestoreError | undefined }> {
    let result, error;

    const data = {
        mistakes: 4 - mistakesLeft,
        hasWon: mistakesLeft > 0,
        timeCompleted
    };

    result = await addDoc(dbInstance, data).catch((e) => error = e);

    if (error) {
        console.log(error);
    }
    return { result, error };
}

export async function addShare(
    timeCompleted: Date,
): Promise<{ result: DocumentReference, error: FirestoreError | undefined }> {
    let result, error;

    const data = {
        timeCompleted
    };

    result = await addDoc(shareDb, data).catch((e) => error = e);

    if (error) {
        console.log(error);
    }
    return { result, error };
}

export async function getMetrics(): Promise<object> {
    const count = await getCountFromServer(dbInstance);
    const q = query(dbInstance, where("hasWon", "==", true));
    const snapshot = await getCountFromServer(q);

    const averageMistakes = await getAggregateFromServer(dbInstance, {
        averageMistakes: average('mistakes')
    });
    const shareCount = await getCountFromServer(shareDb);

    return { 
        count: count.data().count, 
        mistakes: averageMistakes.data().averageMistakes,
        hasWon: snapshot.data().count,
        shareCount: shareCount.data().count,
    };
}

const dataConverter = {
    toFirestore: (data: GameHistory): DocumentData => {
        let result: DocumentData = {
            mistakes: data.mistakes,
            hasWon: data.hasWon,
            timeCompleted: data.timeCompleted
        };
        return result;
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions) => {
        const data = snapshot.data(options);
        let result = {
            mistakes: data.mistakes,
            hasWon: data.hasWon,
            timeCompleted: data.timeCompleted
        } as GameHistory;
        return result;
    }
};