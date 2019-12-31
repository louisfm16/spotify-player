//                       .-._                                                   _,-,
//                       `._`-._                                           _,-'_,'
//                          `._ `-._                                   _,-' _,'
//                             `._  `-._        __.-----.__        _,-'  _,'
//                                `._   `#==="""           """===#'   _,'
//                                   `._/)  ._               _.  (\_,'
//                                    )*'     **.__     __.**     '*( 
//                                    #  .==..__  ""   ""  __..==,  # 
//                                    #   `"._(_).       .(_)_."'   #
//  __| |____________________________________________________________________________________________| |__
// (__   ____________________________________________________________________________________________   __)
//    | |                                                                                            | |
//    | |  ██╗      ██████╗ ██╗   ██╗██╗███████╗    ███╗   ███╗███████╗██████╗ ██╗███╗   ██╗ █████╗  | |
//    | |  ██║     ██╔═══██╗██║   ██║██║██╔════╝    ████╗ ████║██╔════╝██╔══██╗██║████╗  ██║██╔══██╗ | |
//    | |  ██║     ██║   ██║██║   ██║██║███████╗    ██╔████╔██║█████╗  ██║  ██║██║██╔██╗ ██║███████║ | |
//    | |  ██║     ██║   ██║██║   ██║██║╚════██║    ██║╚██╔╝██║██╔══╝  ██║  ██║██║██║╚██╗██║██╔══██║ | |
//    | |  ███████╗╚██████╔╝╚██████╔╝██║███████║    ██║ ╚═╝ ██║███████╗██████╔╝██║██║ ╚████║██║  ██║ | |
//    | |  ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ | |
//  __| |____________________________________________________________________________________________| |__
// (__   ____________________________________________________________________________________________   __)
//    | |                                                                                            | |


// Begin Variables
// Fake Song Data
var songData = [
    {
        name: 'ATM',
        artist: 'J. Cole',
        imgUrl: 'assets/images/test_cover.jpg'
    },
    {
        name: 'Sometimes...',
        artist: 'Tyler, The Creator',
        imgUrl: 'assets/images/test_cover2.jpg'
    },
    {
        name: 'South Side of the Sky',
        artist: 'Yes',
        imgUrl: 'assets/images/test_cover3.jpg'
    },
    {
        name: 'Somewhere In Between',
        artist: 'Token',
        imgUrl: 'assets/images/test_cover4.jpg'
    },
    {
        name: 'Get In My Car',
        artist: '50 Cent',
        imgUrl: 'assets/images/test_cover5.jpg'
    },
    {
        name: 'I Don\'t Die',
        artist: 'Joyner Lucas',
        imgUrl: 'assets/images/test_cover6.jpg'
    },
    {
        name: 'Strange Music Box',
        artist: 'Tech N9ne',
        imgUrl: 'assets/images/test_cover7.jpg'
    },
    {
        name: 'Blockbuster Night, Pt. 1',
        artist: 'Run The Jewels',
        imgUrl: 'assets/images/test_cover8.jpg'
    },
    {
        name: 'Man Of The Year',
        artist: 'ScHoolboy Q',
        imgUrl: 'assets/images/test_cover9.jpg'
    }
];

// Flags
var songPlaying = true,
    togglePanel = false,
    songLiked = false;

var mc,
    screen,
    btnCancel,
    btnPause,
    btnAdd,
    slider,
    heart,
    cardShadow,
    currCard,
    currImg,
    currCardPos = {},
    currSongPerc = 0;

const bp = 300,
    angleBp = 10,
    maxOpacity = 0.6,
    lAngleBp = 180 - angleBp,
    rAngleBp = angleBp;

// End Variables



// Begin Init Functions
window.addEventListener('load', function(){
    Init();

    CreateEvents();
});

function Init() {
    // Assign all instantiated variables
    screen = document.getElementById('panels-container');
    btnCancel = document.getElementById('controls-cancel');
    btnPause = document.getElementById('controls-pause');
    btnAdd = document.getElementById('controls-add');
    slider = document.getElementById('slide-percent');
    currCard = document.getElementById('panel-curr');
    cardShadow = document.getElementById('panel-shadow');
    currImg = currCard.getElementsByTagName('img')[0];
    mc = new Hammer.Manager(currCard);

    // Add recognizers to Hammer manager
    mc.add(new Hammer.Pan());
    mc.add(new Hammer.Press());

    // Set up first set of 3 cards
    SetUpFirstCard();
    CreateNewCard();
    CreateNewCard();

    // Consistent event listeners for add & cancel buttons
    btnCancel.addEventListener('click', function() {
        // currCardPos is undefined at its default state, this makes sure it snaps left
        currCardPos = {
            x: -1000,
            y: -1 * (currCard.offsetHeight / 2)
        }

        ShadowOpacity(0, 0.1);
        SnapLeft(currCard, {angle: 0, deltaX: -500, deltaY: 0});
    });

    btnPause.addEventListener('click', function() {
        TogglePause();
    });

    btnAdd.addEventListener('click', function() {
        // currCardPos is undefined at its default state, this makes sure it snaps right
        currCardPos = {
            x: 500,
            y: -1 * (currCard.offsetHeight / 2)
        }

        ShadowOpacity(0, 0.1);
        SnapRight(currCard, {angle: 0, deltaX: 500, deltaY: 0});
    });
}

// End Init Functions



// Begin Card/Panel Actions

// Add the correct attributes, elements, etc. to the current card
function SetUpFirstCard() {
    var song = songData[Math.floor(Math.random() * songData.length)];

    var img = currCard.getElementsByTagName('img')[0];
    img.setAttribute('draggable', 'false');
    img.setAttribute('src', song.imgUrl);
    img.setAttribute('alt', song.name);

    var url = img.getAttribute('src');
    cardShadow.style.backgroundImage = 'url(../'+url+')';

    heart = currCard.getElementsByTagName('span')[0];
    heart.setAttribute('id', 'heart');

    // Track Details
    var title = document.getElementById('panel_details-title');
    var artist = document.getElementById('panel_details-artist');

    title.innerHTML = song.name;
    artist.innerHTML = song.artist;
}

// Setup the next card in line to be the currCard
function SetUpNextCard() {
    screen.getElementsByTagName('div')[0].setAttribute('id', 'panel-curr');

    currCard = document.getElementById('panel-curr');
    currCard.setAttribute('class', 'panel');
    currCard.style.transition = 'all 0.3s ease-in-out';
    currCardPos = {};

    heart = currCard.getElementsByTagName('span')[0];
    heart.setAttribute('id', 'heart');

    mc = new Hammer.Manager(currCard);
    mc.add(new Hammer.Pan());
    mc.add(new Hammer.Press());

    CreateEvents();

    var url = currCard.getElementsByTagName('img')[0].getAttribute('src');
    cardShadow.style.backgroundImage = 'url(../'+url+')';

    setTimeout(function() {
        ShadowOpacity(maxOpacity, 0.3);
    }, 300);
}

// Create a new card to replace the oldest one
function CreateNewCard() {
    var song = songData[Math.floor(Math.random() * songData.length)];

    // Panel/Card
    var panel = document.createElement('div');
    panel.style.opacity = 0;

    if(togglePanel) {
        panel.setAttribute('class', 'panel panel-left');
    }
    else if(!togglePanel) {
        panel.setAttribute('class', 'panel panel-right');
    }

    togglePanel = !togglePanel;

    // Album image
    var img = document.createElement('img');
    img.setAttribute('draggable', 'false');
    img.setAttribute('src', song.imgUrl);
    img.setAttribute('alt', song.name);

    // The heart icon/button
    var heartIcon = document.createElement('span');
    heartIcon.setAttribute('class', 'icon-heart-empty');

    // Track Details
    var details = document.createElement('div');
    var title = document.createElement('div');
    var artist = document.createElement('div');

    details.setAttribute('class', 'panel_details');
    title.setAttribute('id', 'panel_details-title');
    artist.setAttribute('id', 'panel_details-artist');

    title.innerHTML = song.name;
    artist.innerHTML = song.artist;

    details.appendChild(title);
    details.appendChild(artist);

    panel.appendChild(img);
    panel.appendChild(heartIcon);
    panel.appendChild(details);

    screen.appendChild(panel);

    // Show the newly created card/panel
    setTimeout(function() {
        panel.style.opacity = 1;
    }, 100);
}

// Called when the card is snapped to the right/add event
function SnapRight(el, e) {
    SnapAnimation(el, e, function() {
        DestroyCurrCard();
        SetUpNextCard();
        CreateNewCard();
    });
}

// Called when the card is snapped to the left/cancel event
function SnapLeft(el, e) {
    SnapAnimation(el, e, function() {
        DestroyCurrCard();
        SetUpNextCard();
        CreateNewCard();
    })
}

// Called when setting up new currCard
function CreateEvents() {
    mc.on('press panstart panmove', function(e) {
        ShadowOpacity(0, 0.1);

        // TODO: add smooth scale animation, problems with transition
        UpdateCardPos(currCard, e);
    });

    mc.on('pressup panend', function(e) {
        var dist = Math.abs(e.deltaX);
        var dir = Math.sign(e.deltaX);

        // Do we take action or snap back
        if(dist >= bp) {
            if(dir > 0) {
                SnapRight(currCard, e);
            }
            else if(dir < 0) {
                SnapLeft(currCard, e);
            }
        }
        else {
            SnapBack(currCard);
            ShadowOpacity(maxOpacity, 0.3);
        }
    });

    heart.addEventListener("click", function() {
        ToggleLiked();
    });
}

// Dictates the cards position while dragging/holding with mouse or finger
function UpdateCardPos(el, e) {
    currCardPos = {
        x: (e.deltaX - (el.offsetWidth / 2)),
        y: (e.deltaY - (el.offsetHeight / 2))
    }

    el.style.transform = `translate(${currCardPos.x}px, ${currCardPos.y}px) scale(1.1)`;
    el.style.transition = 'none';
}

// Gets rid of the current cards elements and event listeners
function DestroyCurrCard() {
    mc.off('press panstart panmove');
    mc.off('pressup panend');

    mc.destroy();
    currCard.remove();

    ResetSongVars();
    SliderPercentage(0);
}

function ResetSongVars() {
    currSongPerc = 0;
    songLiked = false;

    if(!songPlaying) {
        TogglePause();
    }
}

// End Card/Panel Actions



// Begin Animations

// Snapping Animation based on direction and angle
function SnapAnimation(el, e, callback) {
    var angle = Math.abs(e.angle);
    var newPos = {
        x: ((screen.offsetWidth / 2) * Math.sign(e.deltaX) + currCardPos.x),
        y: ((screen.offsetHeight / 2) * Math.sign(e.deltaY) + currCardPos.y)
    };

    // Check to see if we have to animate diagonally
    if(angle >= (lAngleBp) || angle <= rAngleBp) {
        newPos.y = currCardPos.y;
    }

    el.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;
    el.style.transition = 'all 0.2s ease-in-out';

    setTimeout(callback, 300);
}

// Animation: snaps the card back to the center of the screen if the threshold is not reached
function SnapBack(el) {
    // Original absolute center position
    el.style.top = '50%';
    el.style.left = '50%';
    el.style.transform = 'translate(-50%, -50%)';
    el.style.transition = 'all 0.3s ease-in-out';
}

// End Animations



// Begin Utility Functions

// Sets the Opacity of the currCards shadow
function ShadowOpacity(val, sec) {
    cardShadow.style.opacity = val;
    cardShadow.style.transition = 'all '+ sec +'s ease-in';
}

function SliderPercentage(percent) {
    if(percent > 100) {
        percent = 100;
    } 
    else if(percent < 0) {
        percent = 0;
    }

    slider.style.width = percent + "%";
}

function ToggleLiked() {
    if(!songLiked) {
        heart.classList.remove("icon-heart-empty");
        heart.classList.add("icon-heart");
    } 
    else if(songLiked) {
        heart.classList.remove("icon-heart");
        heart.classList.add("icon-heart-empty");
    }

    songLiked = !songLiked;
}

function TogglePause() {
    if(songPlaying) {
        btnPause.classList.remove("controls_actions-pause");
        btnPause.classList.add("controls_actions-play");
    } 
    else if(!songPlaying) {
        btnPause.classList.remove("controls_actions-play");
        btnPause.classList.add("controls_actions-pause");
    }

    songPlaying = !songPlaying;
}

// End Utility Functions



// // Parallax
// currCard.addEventListener('tiltChange', function(e) {
//     var mult = 5; 

//     var pos = {
//         top: 50 + (e.detail.tiltY * mult),
//         left: 50 - (e.detail.tiltX * mult)
//     }

//     currImg.style.top = (pos.top + '%');
//     currImg.style.left = (pos.left + '%');
//     currImg.style.transition = 'none';

//     // Has small delay, syncs when image is still
//     cardShadow.style.transform = currCard.style.transform;
// });

// // Reset image position
// currCard.addEventListener('mouseleave', function(e) {
//     currImg.style.top = '50%';
//     currImg.style.left = '50%';
//     currImg.style.transition = 'all 0.3s';
//     cardShadow.style.transform = 'translate(-50%, -50%)';
// });