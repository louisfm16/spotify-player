window.addEventListener('load', function(){
    var glide = new Glide('#panels-container', {
        // startAt: 0,
        perTouch: 1,
        perView: 3,
        gap: 200,
        // focusAt: 0,

        // perView: 1,
        // peek: 500
    });
    
    glide.mount();
});