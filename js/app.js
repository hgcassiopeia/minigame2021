$(document).ready(function(){ 
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

    //  globals
    var tileClicked = false;
    var firstTileClicked; 
    var secondTileClicked; 
    var topPosFir = 0;
    var leftPosFir = 0;
    var topPosSec = 0;
    var leftPosSec = 0;
    var shuffle = Math.floor((Math.random() * 4) + 1);
    var moves = 0;
    var secs = 0;
    var myId = 0;
    var profile = {};

    //  shuffle the tiles
    function shuffleTiles(){
        if(shuffle == 1){
            $('#piece-1').css({top: 100, left: 200});
            $('#piece-2').css({top: 0, left: 200});
            $('#piece-3').css({top: 100, left: 100});
            $('#piece-4').css({top: 0, left: 100});
            $('#piece-5').css({top: 100, left: 0});
            $('#piece-6').css({top: 0, left: 0});
        } else if(shuffle == 2){
            $('#piece-1').css({top: 100, left: 0});
            $('#piece-2').css({top: 0, left: 0});
            $('#piece-3').css({top: 100, left: 100});
            $('#piece-4').css({top: 0, left: 100});
            $('#piece-5').css({top: 100, left: 200});
            $('#piece-6').css({top: 0, left: 200});
        } else if(shuffle == 3){
            $('#piece-1').css({top: 0, left: 200});
            $('#piece-2').css({top: 0, left: 0});
            $('#piece-3').css({top: 100, left: 100});
            $('#piece-4').css({top: 100, left: 200});
            $('#piece-5').css({top: 0, left: 100});
            $('#piece-6').css({top: 100, left: 0});
        } else if(shuffle == 4){
            $('#piece-1').css({top: 0, left: 200});
            $('#piece-2').css({top: 100, left: 200});
            $('#piece-3').css({top: 0, left: 100});
            $('#piece-4').css({top: 100, left: 100});
            $('#piece-5').css({top: 0, left: 0});
            $('#piece-6').css({top: 100, left: 0});
        }
    }

    async function getUserProfile() {
        profile = await liff.getProfile()
        document.getElementById("pictureUrl").src = profile.pictureUrl
        document.getElementById("statusMessage").append(profile.statusMessage)
        document.getElementById("displayName").append(profile.displayName)
        const gameRef = dbRef.child('games');
        let newUser = {
          userId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
          timeScore: 0.0,
          moveScore: 0
        }
        gameRef.push(newUser).then((snap) => {
            myId = snap.key 
        })
    }

    async function main() {
        await liff.init({ liffId: "1655315308-k2ZaAZZm" })
        if (liff.isLoggedIn()) {
            getUserProfile()
        } else {
            liff.login({ redirectUri: "https://hgcassiopeia.github.io/minigame2021/path/" })
        }
    }

    $(window).load(function(){
        setTimeout(function(){
            shuffleTiles();
            setInterval(function(){ 
            secs++ 
            }, 500);
        }, 500);
    });

    //  play the game

    $('.pieces').click(function(){

        if(tileClicked == false){  //  if no tile is clicked

          //  set variables
          firstTileClicked = $(this).attr('id');
          topPosFir = parseInt($(this).css('top')); 
          leftPosFir = parseInt($(this).css('left')); 

          //  highlight tile
          $(this).addClass('glow');
          tileClicked = true;

        } else{  //  if you've clicked a tile

          //  set variables
          secondTileClicked = $(this).attr('id');
          topPosSec = parseInt($(this).css('top')); 
          leftPosSec = parseInt($(this).css('left'));

          //  animations
          $('#' + firstTileClicked).css({'top' : topPosSec , 'left' : leftPosSec});
          $('#' + secondTileClicked).css({'top' : topPosFir , 'left' : leftPosFir});

          //  remove the glow and reset the first tile
          $('.pieces').removeClass('glow');
          tileClicked = false;

          //  test for the win

          setTimeout(function(){
            if(
              $('#piece-1').css('left') == '0px' && $('#piece-1').css('top') == '0px' && 
              $('#piece-2').css('left') == '100px' && $('#piece-2').css('top') == '0px' &&
              $('#piece-3').css('left') == '200px' && $('#piece-3').css('top') == '0px' &&
              $('#piece-4').css('left') == '0px' && $('#piece-4').css('top') == '100px' &&
              $('#piece-5').css('left') == '100px' && $('#piece-5').css('top') == '100px' &&
              $('#piece-6').css('left') == '200px' && $('#piece-6').css('top') == '100px' 
            ){
                const gameRef = dbRef.child('games/' + myId);
                let updateScore = {
                    userId: profile.userId,
                    displayName: profile.displayName,
                    pictureUrl: profile.pictureUrl,
                    timeScore: secs,
                    moveScore: moves
                }
                gameRef.update(updateScore)

                $('p').text('You have solved the puzzle in ' + secs + ' seconds using ' + moves + ' moves!!');
                $('article').addClass('glow-2');
                moves = 0;
            }
          }, 1000);

          //  increment the move counter
          moves++
        }
    });  //  end the click function

    main()
})
