import 'server-only'

import {getApp, getApps, initializeApp} from 'firebase-admin/app';
import {credential} from "firebase-admin";
import {getFirestore} from "firebase-admin/firestore";


const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);


if (getApps()?.length === 0) {
    initializeApp({
        credential: credential.cert(serviceAccount),
        databaseURL: 'https://app-db.firebaseio.com'
    }, 'root');
}

export const fb = getApp('root');

export const fireStore = getFirestore(getApp('root'));


