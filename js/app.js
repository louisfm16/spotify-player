window.addEventListener('load', function(){
    // Glide JS
    var glide = new Glide('.glide', {
        perTouch: 1,
        perView: 3,
        gap: 100,
        bound: true,
        rewind: false,

        // perView: 1,
        // peek: 500
    });
    
    glide.mount();

    console.log(glide);

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
    });

    // Reset image position
    // TODO: add transition / Easing
    curr.addEventListener("mouseleave", function(e) {
        img.style.top = "50%";
        img.style.left = "50%";
    });
});