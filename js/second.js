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
    var shufflePosition = []

    //  shuffle the tiles
    function shuffleTiles(){
        if(shuffle == 1){
            $('#piece-1').css({top: 100, left: 200});
            $('#piece-2').css({top: 0, left: 200});
            $('#piece-3').css({top: 100, left: 100});
            $('#piece-4').css({top: 0, left: 100});
            $('#piece-5').css({top: 100, left: 0});
            $('#piece-6').css({top: 0, left: 0});
            $('#piece-7').css({top: 200, left: 200});
            $('#piece-8').css({top: 200, left: 0});
            $('#piece-9').css({top: 200, left: 100});

            shufflePosition = [
                {
                    id: 'piece-1',
                    top: 100,
                    left: 200
                },
                {
                    id: 'piece-2',
                    top: 0,
                    left: 200
                },
                {
                    id: 'piece-3',
                    top: 100,
                    left: 100
                },
                {
                    id: 'piece-4',
                    top: 0,
                    left: 100
                },
                {
                    id: 'piece-5',
                    top: 100,
                    left: 0
                },
                {
                    id: 'piece-6',
                    top: 0,
                    left: 0
                },
                {
                    id: 'piece-7',
                    top: 200,
                    left: 200
                },
                {
                    id: 'piece-8',
                    top: 200,
                    left: 0
                },
                {
                    id: 'piece-9',
                    top: 200,
                    left: 100
                }
            ]
        } else if(shuffle == 2){
            $('#piece-1').css({top: 100, left: 0});
            $('#piece-2').css({top: 200, left: 200});
            $('#piece-3').css({top: 100, left: 100});
            $('#piece-4').css({top: 0, left: 100});
            $('#piece-5').css({top: 100, left: 200});
            $('#piece-6').css({top: 0, left: 200});
            $('#piece-7').css({top: 0, left: 0});
            $('#piece-8').css({top: 200, left: 0});
            $('#piece-9').css({top: 200, left: 100});

            shufflePosition = [
                {
                    id: 'piece-1',
                    top: 100,
                    left: 0
                },
                {
                    id: 'piece-2',
                    top: 200,
                    left: 200
                },
                {
                    id: 'piece-3',
                    top: 100,
                    left: 100
                },
                {
                    id: 'piece-4',
                    top: 0,
                    left: 100
                },
                {
                    id: 'piece-5',
                    top: 100,
                    left: 200
                },
                {
                    id: 'piece-6',
                    top: 0,
                    left: 200
                },
                {
                    id: 'piece-7',
                    top: 0,
                    left: 0
                },
                {
                    id: 'piece-8',
                    top: 200,
                    left: 0
                },
                {
                    id: 'piece-9',
                    top: 200,
                    left: 100
                }
            ]
        } else if(shuffle == 3){
            $('#piece-1').css({top: 200, left: 200});
            $('#piece-2').css({top: 0, left: 0});
            $('#piece-3').css({top: 100, left: 100});
            $('#piece-4').css({top: 100, left: 200});
            $('#piece-5').css({top: 0, left: 100});
            $('#piece-6').css({top: 100, left: 0});
            $('#piece-7').css({top: 0, left: 200});
            $('#piece-8').css({top: 200, left: 0});
            $('#piece-9').css({top: 200, left: 100});

            shufflePosition = [
                {
                    id: 'piece-1',
                    top: 200,
                    left: 200
                },
                {
                    id: 'piece-2',
                    top: 0,
                    left: 0
                },
                {
                    id: 'piece-3',
                    top: 100,
                    left: 100
                },
                {
                    id: 'piece-4',
                    top: 100,
                    left: 200
                },
                {
                    id: 'piece-5',
                    top: 0,
                    left: 100
                },
                {
                    id: 'piece-6',
                    top: 100,
                    left: 0
                },
                {
                    id: 'piece-7',
                    top: 0,
                    left: 200
                },
                {
                    id: 'piece-8',
                    top: 200,
                    left: 0
                },
                {
                    id: 'piece-9',
                    top: 200,
                    left: 100
                }
            ]
        } else if(shuffle == 4){
            $('#piece-1').css({top: 0, left: 200});
            $('#piece-2').css({top: 100, left: 200});
            $('#piece-3').css({top: 0, left: 100});
            $('#piece-4').css({top: 200, left: 200});
            $('#piece-5').css({top: 0, left: 0});
            $('#piece-6').css({top: 100, left: 0});
            $('#piece-7').css({top: 100, left: 100});
            $('#piece-8').css({top: 200, left: 0});
            $('#piece-9').css({top: 200, left: 100});

            shufflePosition = [
                {
                    id: 'piece-1',
                    top: 0,
                    left: 200
                },
                {
                    id: 'piece-2',
                    top: 100,
                    left: 200
                },
                {
                    id: 'piece-3',
                    top: 0,
                    left: 100
                },
                {
                    id: 'piece-4',
                    top: 200,
                    left: 200
                },
                {
                    id: 'piece-5',
                    top: 0,
                    left: 0
                },
                {
                    id: 'piece-6',
                    top: 100,
                    left: 0
                },
                {
                    id: 'piece-7',
                    top: 100,
                    left: 100
                },
                {
                    id: 'piece-8',
                    top: 200,
                    left: 0
                },
                {
                    id: 'piece-9',
                    top: 200,
                    left: 100
                }
            ]
        }
    }

    async function getUserProfile() {
        profile = await liff.getProfile()

        document.getElementById("displayProfile").src = profile.pictureUrl
        document.getElementById("displayName").append(profile.displayName)
    }

    async function main() {
        await liff.init({ liffId: "1655315308-k2ZaAZZm" })
        if (liff.isLoggedIn()) {
            getUserProfile()
        } else {
            liff.login({ redirectUri: "/minigame2021/path" })
        }
    }

    $(window).load(function(){
        setTimeout(function(){
            shuffleTiles();
            setInterval(function(){ 
                $(".time-move-score>.time").text(secs)
                secs++ 
            }, 1000);
        }, 500);
    });

    function eventListenerStartFinal() {
        const stateRef = dbRef.child('state');
        
        stateRef.on("child_changed", snap => {
            onStart = snap.val()
            if(onStart) {
                const gameRef = dbRef.child(`second/${myId}/finalRound`);
                gameRef.on("value", snap => {
                    if(snap.val()) {
                        goToStartFinal()
                    } else {
                        $("#wait-text").text("เสียใจด้วยคุณไม่ได้ไปต่อ กด 'x' เพื่อปิดเกม")
                    }
                })
            }
        })
    }
    
    function goToStartFinal() {
        window.location.href="/minigame2021/path/final.html"; 
    }

    //  play the game
    $('.pieces').click(function(){
        if(tileClicked == false){  //  if no tile is clicked
          //  set variables
          firstTileClicked = $(this).attr('id');
          let tilePos = shufflePosition.find(tile => tile.id === firstTileClicked)
          topPosFir = tilePos.top
          leftPosFir = tilePos.left 

          //  highlight tile
          $(this).addClass('glow');
          tileClicked = true;

        } else{  //  if you've clicked a tile
          //  set variables
          secondTileClicked = $(this).attr('id');
          let tilePos = shufflePosition.find(tile => tile.id === secondTileClicked)
          topPosSec = tilePos.top
          leftPosSec = tilePos.left

          //  animations
          $('#' + firstTileClicked).css({'top' : topPosSec , 'left' : leftPosSec});
          $('#' + secondTileClicked).css({'top' : topPosFir , 'left' : leftPosFir});

          shufflePosition = shufflePosition.map(tile => {
            if(tile.id === firstTileClicked) {
                tile.top = topPosSec
                tile.left = leftPosSec
            } else if(tile.id === secondTileClicked) {
                tile.top = topPosFir
                tile.left = leftPosFir
            }
            return tile
          })

          //  remove the glow and reset the first tile
          $('.pieces').removeClass('glow');
          tileClicked = false;

          //  test for the win
          setTimeout(function(){
            $(".time-move-score>.move").text(moves)
            if(
              $('#piece-1').css('left') == '0px' && $('#piece-1').css('top') == '0px' && 
              $('#piece-2').css('left') == '100px' && $('#piece-2').css('top') == '0px' &&
              $('#piece-3').css('left') == '200px' && $('#piece-3').css('top') == '0px' &&
              $('#piece-4').css('left') == '0px' && $('#piece-4').css('top') == '100px' &&
              $('#piece-5').css('left') == '100px' && $('#piece-5').css('top') == '100px' &&
              $('#piece-6').css('left') == '200px' && $('#piece-6').css('top') == '100px' &&
              $('#piece-7').css('left') == '0px' && $('#piece-7').css('top') == '200px' &&
              $('#piece-8').css('left') == '100px' && $('#piece-8').css('top') == '200px' &&
              $('#piece-9').css('left') == '200px' && $('#piece-9').css('top') == '200px' 
            ){
                const gameRef = dbRef.child('second');
                let newUser = {
                    userId: profile.userId,
                    displayName: profile.displayName,
                    pictureUrl: profile.pictureUrl,
                    timeScore: secs,
                    moveScore: moves,
                    finalRound: false
                }
                gameRef.push(newUser).then((snap) => {
                    myId = snap.key 
                })

                $('.result-score').text('คุณใช้เวลา ' + secs + ' วิ และขยับ ' + moves + ' ครั้ง!!');
                $('article').addClass('glow-2');
                moves = 0;

                setTimeout(function(){
                    $('#overlay').css("display", "block")
                    eventListenerStartFinal()
                }, 1000)
            }
          }, 1000);

          //  increment the move counter
          moves++
        }
    });  //  end the click function

    main()
})