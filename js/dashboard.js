const firebaseConfig = {
    apiKey: "AIzaSyAWYLsymh00gcW2kxaSe7LAr6q8nqn6jA8",
    authDomain: "minigamenewyear2020.firebaseapp.com",
    databaseURL: "https://minigamenewyear2020-default-rtdb.firebaseio.com",
    projectId: "minigamenewyear2020",
    storageBucket: "minigamenewyear2020.appspot.com",
    messagingSenderId: "755521062063",
    appId: "1:755521062063:web:dc6547a49cd66823d3805a",
    measurementId: "G-CN5747PXZE"
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

const dbRef = firebase.database().ref();
const gamesRef = dbRef.child('games');
const stateRef = dbRef.child('state');

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        gameList: []
    },
    created() {
        this.initFirebase()
    },
    methods: {
        initFirebase() {
            gamesRef.orderByChild("timeScore").on("child_added", snap => {
                let game = snap.val();
                let tmp = {
                    key: snap.key,
                    displayName: game.displayName,
                    timeScore: game.timeScore,
                    moveScore: game.moveScore
                }
                this.gameList.push(tmp)
            });

            gamesRef.orderByChild("timeScore").limitToFirst(5).on("child_changed", snap => {
                let game = snap.val();
                this.gameList.map(gl => {
                    if(gl.key == snap.key){
                        gl.timeScore = game.timeScore
                        gl.moveScore = game.moveScore
                    }
                    return gl
                })
                this.gameList = this.gameList.sort((a, b) => a.timeScore - b.timeScore || a.moveScore - b.moveScore)
            })
        },
        eventListenerStart() {
            stateRef.update({ start: true })
        },
        resetGame() {
            stateRef.update({ start: false })
            gamesRef.remove()
        }
    }
})