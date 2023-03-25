import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBFIIcAw4FtWhPmWIzhryOoE07Thdf-m-g",
    authDomain: "allomni-bi-75f7e.firebaseapp.com",
    projectId: "allomni-bi-75f7e",
    storageBucket: "allomni-bi-75f7e.appspot.com",
    messagingSenderId: "669922107012",
    appId: "1:669922107012:web:d49353aade173b5aa6acd1"
};

firebase.initializeApp(firebaseConfig)

export default firebase