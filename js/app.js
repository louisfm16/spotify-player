window.addEventListener('load', function(){
    // Glide JS
    var glide = new Glide('#panels-container', {
        perTouch: 1,
        perView: 3,
        gap: 100,

        // perView: 1,
        // peek: 500
    });
    
    glide.mount();

    // Tilt JS
    VanillaTilt.init(document.querySelectorAll(".curr"), {
        max: 1,
        perspective: 300,
        scale: 1,
        speed: 300,
        glare: true,

    });
});