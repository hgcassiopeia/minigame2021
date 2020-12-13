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
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const dbRef = firebase.database().ref();
const stateRef = dbRef.child('state');

var app = new Vue({
  el: '#app',
  data: {
      onStart: false
  },
  created() {
    this.eventListenerStart()
  },
  methods: {
    eventListenerStart() {
      stateRef.on("child_changed", snap => {
          this.onStart = snap.val()
          if(this.onStart) this.goToStart()
      })
    },
    goToStart() {
      window.location.href="/minigame2021/path/?param=1"; 
    }
  }
})

function closed() {
  liff.closeWindow()
}

async function scanCode() {
  const result = await liff.scanCode()
  document.getElementById("scanCode").append(result.value)
}

async function getUserProfile() {
  const profile = await liff.getProfile()
  document.getElementById("displayProfile").src = profile.pictureUrl
  document.getElementById("statusMessage").append('Happy New Year ʕ •ᴥ• ʔ')
  document.getElementById("displayName").append(profile.displayName)
}

async function main() {
  liff.ready.then(() => {
    if (liff.isLoggedIn()) {
      getUserProfile()
    } else {
      liff.login()
    }
  })
  await liff.init({ liffId: "1655315308-k2ZaAZZm" })
}

main()