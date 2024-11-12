import { collection, doc, addDoc, setDoc, getDoc, DocumentReference, DocumentData, FirestoreError, QueryDocumentSnapshot, SnapshotOptions, } from 'firebase/firestore';
import { database } from "./config";
import { GameHistory, GameItem } from '../app/types';

const dbInstance = collection(database, 'plays');

export async function addGame(
    moves: Array<Array<GameItem>>,
    mistakesLeft: number,
    timeCompleted: Date,
): Promise<{ result: DocumentReference, error: FirestoreError | undefined }> {
    let result, error;

    const data = {
        moves: moves.toString(),
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

// export async function updateGame(slug: string, data: GameData): Promise<void> {
//     await setDoc(doc(database, "connections", slug), data);
// }

// export async function getDataFromSlug(slug: string): Promise<{ result: GameData | null, error: string }> {
//     const ref = doc(database, "connections", slug).withConverter(dataConverter);
//     const document = await getDoc(ref);
//     const data = document.data();

//     if (data) {
//         return { result: data, error: "" };
//     } else {
//         return { result: null, error: "Error." };
//     }
// }

const dataConverter = {
    toFirestore: (data: GameHistory): DocumentData => {
        let result: DocumentData = {
            mistakes: data.mistakes,
            hasWon: data.hasWon,
            moves: data.moves,
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
            moves: data.moves,
            timeCompleted: data.timeCompleted
        } as GameHistory;
        return result;
    }
};