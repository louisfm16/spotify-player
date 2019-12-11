window.addEventListener('load', function(){
    new Glider(document.querySelector('.glider'), {
        slidesToShow: "auto",
        draggable: true,
        itemWidth: "600px",
        // exactWidth: true
    });
});