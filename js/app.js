// Flags
var shuffle = true,
    pause = false,
    repeat = false,
    mute = false;

var glide;

window.addEventListener('load', function(){
    Init();

    // Tilt JS
    var curr = document.querySelector("#curr");
    var img = document.querySelector("#img-curr");

    VanillaTilt.init(curr, {
        max: 1,
        perspective: 100,
        scale: 1,
        speed: 1500,
        reverse: true
    });

    // Parallax
    curr.addEventListener("tiltChange", function(e) {
        var mult = 5; 

        var pos = {
            top: 50 + (e.detail.tiltY * mult),
            left: 50 - (e.detail.tiltX * mult)
        }

        img.style.top = (pos.top + "%");
        img.style.left = (pos.left + "%");
        img.style.transition = "none";
    });

    // Reset image position
    curr.addEventListener("mouseleave", function(e) {
        img.style.top = "50%";
        img.style.left = "50%";
        img.style.transition = "all 0.3s";
    });
});

function Init() {
    // Glide JS
    // TODO: May need to reference later for breakpoints
    glide = new Glide('.glide', {
        startAt: 1,
        perTouch: 1,
        perView: 1,
        gap: 200,
        bound: true,
        rewind: false,
        peek: 900
    }).mount();


}

// function ad