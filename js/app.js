// Fake Data
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
var pause = false,
    mute = false;

var mc,
    screen,
    cardShadow,
    currCard,
    currImg,
    currCardPos = {};

    var toggle = 0;

const bp = 300,
    angleBp = 10,
    maxOpacity = 0.6,
    lAngleBp = 180 - angleBp,
    rAngleBp = angleBp;

window.addEventListener('load', function(){
    Init();

    CreateEvents();
});

function Init() {
    screen = document.getElementById('panels-container');
    currCard = document.getElementById('panel-curr');
    cardShadow = document.getElementById('panel-shadow');
    currCard = document.getElementById('panel-curr');
    currImg = currCard.getElementsByTagName('img')[0];
    mc = new Hammer.Manager(currCard);

    mc.add(new Hammer.Pan());
    mc.add(new Hammer.Press());

    SetUpFirstCard();
    CreateNewCard();
    CreateNewCard();
}

function UpdateCurrCard() {

}

function UpdateCardPos(el, e) {
    currCardPos = {
        x: (e.deltaX - (el.offsetWidth / 2)),
        y: (e.deltaY - (el.offsetHeight / 2))
    }

    el.style.transform = `translate(${currCardPos.x}px, ${currCardPos.y}px) scale(1.1)`;
    el.style.transition = 'none';
}

function ShadowOpacity(val, sec) {
    cardShadow.style.opacity = val;
    cardShadow.style.transition = 'all '+ sec +'s ease-in';
}

// Actions
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

function SnapBack(el) {
    // Original absolute center position
    el.style.top = '50%';
    el.style.left = '50%';
    el.style.transform = 'translate(-50%, -50%)';
    el.style.transition = 'all 0.3s ease-in-out';
}

function SnapRight(el) {

}

function SnapLeft(el) {

}

function DestroyCurrCard() {
    mc.off('press panstart panmove');
    mc.off('pressup panend');

    mc.destroy();
    currCard.remove();
}

function SetUpFirstCard() {
    var song = songData[Math.floor(Math.random() * songData.length)];

    var img = currCard.getElementsByTagName('img')[0];
    img.setAttribute('draggable', 'false');
    img.setAttribute('src', song.imgUrl);
    img.setAttribute('alt', song.name);
    
    var url = img.getAttribute('src');
    cardShadow.style.backgroundImage = 'url(../'+url+')';

    // Track Details
    var title = document.getElementById('panel_details-title');
    var artist = document.getElementById('panel_details-artist');

    // details.style.opacity = 0;
    title.innerHTML = song.name;
    artist.innerHTML = song.artist;

    setTimeout(function() {
        ShadowOpacity(maxOpacity, 0.3);
    }, 300);
}

function SetUpNextCard() {
    screen.getElementsByTagName('div')[0].setAttribute('id', 'panel-curr');

    currCard = document.getElementById('panel-curr');
    currCard.setAttribute('class', 'panel');
    currCard.style.transition = 'all 0.3s ease-in-out';
    currCardPos = {};

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

function CreateNewCard() {
    var song = songData[Math.floor(Math.random() * songData.length)];

    // Panel/Card
    var panel = document.createElement('div');
    panel.style.opacity = 0;

    if(toggle == 0) {
        toggle = 1;
        panel.setAttribute('class', 'panel panel-left');
    }
    else if(toggle == 1) {
        toggle = 0;
        panel.setAttribute('class', 'panel panel-right');
    }

    // Album image
    var img = document.createElement('img');
    img.setAttribute('draggable', 'false');
    img.setAttribute('src', song.imgUrl);
    img.setAttribute('alt', song.name);

    // Track Details
    var details = document.createElement('div');
    var title = document.createElement('div');
    var artist = document.createElement('div');

    details.setAttribute('class', 'panel_details');
    title.setAttribute('id', 'panel_details-title');
    artist.setAttribute('id', 'panel_details-artist');

    // details.style.opacity = 0;
    title.innerHTML = song.name;
    artist.innerHTML = song.artist;

    details.appendChild(title);
    details.appendChild(artist);

    panel.appendChild(img);
    panel.appendChild(details);
    screen.appendChild(panel);

    setTimeout(function() {
        panel.style.opacity = 1;
    }, 100)
}

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
            SnapAnimation(currCard, e, function() {
                DestroyCurrCard();
                SetUpNextCard();
                CreateNewCard();
            });

            if(dir > 0) { // Right
                SnapRight(currCard);
            }
            else if(dir < 0) { // Left
                SnapLeft(currCard);
            }
        }
        else {
            SnapBack(currCard);
            ShadowOpacity(maxOpacity, 0.3);
        }
    });
}



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