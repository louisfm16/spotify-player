// Fake Data
var songData = [
    {
        name: "song1",
        artist: 'artist1',
        imgUrl: 'assets/images/test_cover.jpg'
    },
    {
        name: "song2",
        artist: 'artist2',
        imgUrl: 'assets/images/test_cover2.jpg'
    },
    {
        name: "song3",
        artist: 'artist3',
        imgUrl: 'assets/images/test_cover3.jpg'
    }
];

// Flags
var pause = false,
    mute = false;

var mc,
    screen,
    cardShadow,
    currCard,
    currCardPos = {};

const bp = 300,
    angleBp = 10,
    maxOpacity = 0.6,
    lAngleBp = 180 - angleBp,
    rAngleBp = angleBp;

window.addEventListener('load', function(){
    Init();

    CreateEvents();

    // // Tilt JS
    // var img = document.querySelector("#img-curr");

    // VanillaTilt.init(currCard, {
    //     max: 1,
    //     perspective: 100,
    //     scale: 1,
    //     speed: 1500,
    //     reverse: true
    // });

    // // Parallax
    // currCard.addEventListener("tiltChange", function(e) {
    //     var mult = 5; 

    //     var pos = {
    //         top: 50 + (e.detail.tiltY * mult),
    //         left: 50 - (e.detail.tiltX * mult)
    //     }

    //     img.style.top = (pos.top + "%");
    //     img.style.left = (pos.left + "%");
    //     img.style.transition = "none";
    // });

    // // Reset image position
    // currCard.addEventListener("mouseleave", function(e) {
    //     img.style.top = "50%";
    //     img.style.left = "50%";
    //     img.style.transition = "all 0.3s";
    // });
});

function Init() {
    screen = document.getElementById('panels-container');
    cardShadow = document.getElementById('panel-shadow');
    currCard = document.getElementById('panel-curr');
    mc = new Hammer.Manager(currCard);
    mc.add(new Hammer.Pan());
    mc.add(new Hammer.Press());
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

function ShadowOpacity(val) {
    cardShadow.style.opacity = val;
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

function SetUpNextCard() {
    screen.getElementsByTagName('div')[0].setAttribute('id', 'panel-curr');
    currCard = document.getElementById('panel-curr');
    currCard.style.transition = 'all 1s ease-in-out';
    currCardPos = {};

    mc = new Hammer.Manager(currCard);
    mc.add(new Hammer.Pan());
    mc.add(new Hammer.Press());

    CreateEvents();

    var url = currCard.getElementsByTagName('img')[0].getAttribute('src');
    cardShadow.style.backgroundImage = 'url(../'+url+')';
    ShadowOpacity(maxOpacity);
}

function CreateNewCard() {
    var song = songData[Math.floor(Math.random() * songData.length)];

    var div = document.createElement('div');
    div.setAttribute('class', 'panel panel-'+song.name);

    var img = document.createElement('img');
    img.setAttribute('draggable', 'false');
    img.setAttribute('src', song.imgUrl);
    img.setAttribute('alt', 'An image is here');

    div.appendChild(img);
    screen.appendChild(div);
}

function CreateEvents() {
    mc.on('press panstart panmove', function(e) {
        ShadowOpacity(0);

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
            ShadowOpacity(maxOpacity);
        }
    });
}