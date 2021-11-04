import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBniny9o_CoJCmJdVTUrSnFwKYfLFN789g",
  authDomain: "catch-of-the-day-oalbacha.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-oalbacha-default-rtdb.firebaseio.com/",
})

const base = Rebase.createClass(firebaseApp.database())

// named export
export { firebaseApp }

// default export
export default base