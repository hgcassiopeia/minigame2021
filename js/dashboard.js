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
const finalRef = dbRef.child('final');
const stateRef = dbRef.child('state');

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        gameList: [],
        finalList: []
    },
    created() {
        this.initFirebase()
    },
    methods: {
        initFirebase() {
            gamesRef.on("child_added", snap => {
                let game = snap.val();
                let key = snap.key;
                let tmp = {
                    key: snap.key,
                    displayName: game.displayName,
                    timeScore: game.timeScore,
                    moveScore: game.moveScore,
                    finalRound: false
                }
                this.gameList.push(tmp)
                this.gameList = this.gameList.sort((a, b) => a.timeScore - b.timeScore || a.moveScore - b.moveScore)
                this.gameList = this.gameList.slice(0, 1)
                console.log("TEST", this.gameList)
                let foundIndex = this.gameList.findIndex(item => item.key == key)
                if(foundIndex >= 0){
                    dbRef.child(`games/${key}`).update({ finalRound: true })
                } else {
                    dbRef.child(`games/${key}`).update({ finalRound: false })
                }
            });

            // gamesRef.on("child_changed", snap => {
            //     let game = snap.val();
            //     let key = snap.key;
            //     this.gameList.map(gl => {
            //         if(gl.key == key){
            //             gl.timeScore = game.timeScore
            //             gl.moveScore = game.moveScore
            //         }
            //         return gl
            //     })
            //     this.gameList = this.gameList.sort((a, b) => a.timeScore - b.timeScore || a.moveScore - b.moveScore)
            //     this.gameList = this.gameList.slice(0, 1)
            //     // let foundIndex = this.gameList.findIndex(item => item.key == key)
            //     // console.log("TEST", this.gameList)
            //     // if(foundIndex >= 0){
            //     //     dbRef.child(`games/${key}`).update({ finalRound: true })
            //     // } else {
            //     //     dbRef.child(`games/${key}`).update({ finalRound: false })
            //     // }
            // })

            finalRef.on("child_added", snap => {
                let game = snap.val();
                let tmp = {
                    key: snap.key,
                    displayName: game.displayName,
                    timeScore: game.timeScore,
                    moveScore: game.moveScore
                }
                this.finalList.push(tmp)
                this.finalList = this.finalList.sort((a, b) => a.timeScore - b.timeScore || a.moveScore - b.moveScore)
                this.finalList = this.finalList.slice(0, 3)
            });

            // finalRef.on("child_changed", snap => {
            //     let game = snap.val();
            //     this.finalList.map(gl => {
            //         if(gl.key == snap.key){
            //             gl.timeScore = game.timeScore
            //             gl.moveScore = game.moveScore
            //         }
            //         return gl
            //     })
            //     this.finalList = this.finalList.sort((a, b) => a.timeScore - b.timeScore || a.moveScore - b.moveScore)
            //     this.finalList = this.finalList.slice(0, 3)
            // })
        },
        eventListenerStart() {
            stateRef.update({ start: true })
            window.location.href="/minigame2021/path/dashboard.html"; 
        },
        resetGame() {
            stateRef.update({ start: false })
            gamesRef.remove()
        },
        eventListenerStartFinal() {
            stateRef.update({ startFinal: true })
            window.location.href="/minigame2021/path/dashboardFinal.html"; 
        },
        resetGameFinal() {
            stateRef.update({ startFinal: false })
            finalRef.remove()
        }
    }
})