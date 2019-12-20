// Flags
var shuffle = true,
    pause = false,
    repeat = false,
    mute = false;

window.addEventListener('load', function(){
    Init();

    var el = document.getElementById('curr');
    var ht = Hammer(el);

    ht.on('pan', function(e) {
        console.log("pan: ", e);
    });

    ht.on('press', function(e) {
        console.log("press: ", e);
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

}