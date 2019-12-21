// Flags
var pause = false,
    mute = false;

var mc,
    screen,
    currCard,
    currCardPos = {};

const bp = 300,
    angleBp = 10,
    lAngleBp = 180 - angleBp,
    rAngleBp = angleBp;

window.addEventListener('load', function(){
    Init();

    mc.on('press panstart panmove', function(e) {
        // TODO: add smooth scale animation, problems with transition
        UpdateCardPos(currCard, e);
    });

    mc.on('pressup panend', function(e) {
        var dist = Math.abs(e.deltaX);
        var dir = Math.sign(e.deltaX);

        // Do we take action or snap back
        if(dist >= bp) {
            SnapAnimation(currCard, e);

            if(dir > 0) { // Right
                SnapRight(currCard);
            }
            else if(dir < 0) { // Left
                SnapLeft(currCard);
            }
        }
        else {
            SnapBack(currCard);
        }
    });

    // // Tilt JS
    // var curr = document.querySelector("#curr");
    // var img = document.querySelector("#img-curr");

    // VanillaTilt.init(curr, {
    //     max: 1,
    //     perspective: 100,
    //     scale: 1,
    //     speed: 1500,
    //     reverse: true
    // });

    // // Parallax
    // curr.addEventListener("tiltChange", function(e) {
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
    // curr.addEventListener("mouseleave", function(e) {
    //     img.style.top = "50%";
    //     img.style.left = "50%";
    //     img.style.transition = "all 0.3s";
    // });
});

function Init() {
    screen = document.getElementById('panels-container');
    currCard = document.getElementById('curr');
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

// Actions
function SnapAnimation(el, e) {
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