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
        }
    },
    mounted() {
        // this.onChanged()
    }
})

// $(document).ready(function(){ 

//     const firebaseConfig = {
//         apiKey: "AIzaSyAWYLsymh00gcW2kxaSe7LAr6q8nqn6jA8",
//         authDomain: "minigamenewyear2020.firebaseapp.com",
//         databaseURL: "https://minigamenewyear2020-default-rtdb.firebaseio.com",
//         projectId: "minigamenewyear2020",
//         storageBucket: "minigamenewyear2020.appspot.com",
//         messagingSenderId: "755521062063",
//         appId: "1:755521062063:web:dc6547a49cd66823d3805a",
//         measurementId: "G-CN5747PXZE"
//     };
//     // Initialize Firebase
//     var app = firebase.initializeApp(firebaseConfig);
//     db = firebase.firestore(app);
//     firebase.analytics();
//     const dbRef = firebase.database().ref();
//     const gamesRef = dbRef.child('games');
//     const gameListUI = document.getElementById("gameList");
    
//     gamesRef.orderByChild("timeScore").limitToFirst(5).on("value", snapshot => {
//         snapshot.forEach(snap => {

//         })
//     })
    // gamesRef.orderByChild("timeScore").limitToFirst(5).on("value", snapshot => {
        // snapshot.forEach(snap => {
        //     let game = snap.val()
        //     const listElems = document.querySelectorAll("li")
        //     let findIndex = listElems.find(listElem => snap.key == listElem.getAttribute('key'))
            // console.log("Index::", findIndex)
            // if(listElems.length === 0) {
            //     gameListUI.innerHTML += `
            //         <li key="${snap.key}">${game.displayName} : ${game.timeScore} : ${game.moveScore}</li>
            //     `
            // } else {
            //     listElems.forEach(listElem => {
            //         const key = listElem.getAttribute('key')
            //         if(snap.key == key) {
            //             listElem.innerHTML = `${game.displayName} : ${game.timeScore} : ${game.moveScore}`;
            //         }
            //     })
            // }
        // })
        // let games = snap.val()
        
        // console.log("GAME::: ", JSON.stringify(games))
        // const listElems = document.querySelectorAll("li")
        // listElems.forEach(listElem => {
        //     const key = listElem.getAttribute('key')
        //     if(snap.key == key) {
        //         listElem.innerHTML = `${game.displayName} : ${game.timeScore} : ${game.moveScore}`;
        //     } else {
        //         let $li = document.createElement("li");
        //         $li.innerHTML = `${game.displayName} : ${game.timeScore} : ${game.moveScore}`;
        //         $li.setAttribute("key", snap.key); 
        //         gameListUI.append($li);
        //     }
        // })
        // if(snap.exists()) {
        //     const listElems = document.querySelectorAll("li")
        //     listElems.forEach(listElem => {
        //         const key = listElem.getAttribute('key')
        //         if(snap.key == key) {
        //             listElem.innerHTML = `${game.displayName} : ${game.timeScore} : ${game.moveScore}`;
        //         }
        //     })
        // } else {
            
        // }
    // })

    // gamesRef.orderByChild("timeScore").limitToFirst(5).on("child_added", snap => {
    //     let game = snap.val();
    //     gameListUI.innerHTML += `
    //         <li key="${snap.key}">${game.displayName} : ${game.timeScore} : ${game.moveScore}</li>
    //     `
    // });

    // gamesRef.orderByChild("timeScore").limitToFirst(5).on("child_changed", snap => {
    //     let game = snap.val();
    //     const listElems = document.querySelectorAll("li")
    //     listElems.forEach(listElem => {
    //         const key = listElem.getAttribute('key')
    //         if(snap.key == key) {
    //             listElem.innerHTML = `${game.displayName} : ${game.timeScore} : ${game.moveScore}`;
    //         }
    //     })
    // });
// })