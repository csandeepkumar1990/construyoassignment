import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

// Client config
const config = 
    {
        apiKey: "AIzaSyDf-i3-kecpDpJyG1uR-Jbf0fjXMPhO54U",
        authDomain: "construyo-coding-challenge.firebaseapp.com",
        databaseURL: "https://construyo-coding-challenge.firebaseio.com",
        projectId: "construyo-coding-challenge",
        storageBucket: "construyo-coding-challenge.appspot.com",
        messagingSenderId: "275103082078",
        appId: "1:275103082078:web:3d55c84dee230264"
    };


class Firebase {
    constructor() {
        app.initializeApp(config);

        // this.analytics = app.analytics();
        this.auth = app.auth();
        // this.storage = app.storage();
        // this.functions = app.functions();
    }

    logEvent = (event) =>
        this.analytics.logEvent(event);

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);


    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if(authUser){
                next(authUser)
            }else{
                fallback()
            }
        });

    // *** User API ***
    //return current user
    currUser = () => { return this.auth.currentUser.uid };

}

export default Firebase;