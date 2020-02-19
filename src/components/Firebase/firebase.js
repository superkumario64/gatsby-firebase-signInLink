const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  messagingSenderId: "",
  projectId: "",
  storageBucket: "",
}

class Firebase {
  constructor(app) {
    app.initializeApp(config)
    this.auth = app.auth()
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithLink = email => {
    var actionCodeSettings = {
      // The URL to redirect to for sign-in completion. This is also the deep
      // link for mobile redirects. The domain (www.example.com) for this URL
      // must be whitelisted in the Firebase Console.
      url: "http://introduction.localhost:3000/",
      handleCodeInApp: true,
    }
    return this.auth.sendSignInLinkToEmail(email, actionCodeSettings)
  }
}

let firebase

function getFirebase(app, auth, database) {
  if (!firebase) {
    firebase = new Firebase(app, auth, database)
  }

  return firebase
}

export default getFirebase
