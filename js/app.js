window.addEventListener('load', function(){
    var glide = new Glide('#panels-container', {
        perTouch: 1,
        perView: 3,
        gap: 100,

        // perView: 1,
        // peek: 500
    });
    
    glide.mount();
});