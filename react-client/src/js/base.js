const base = () => {
    window.addEventListener("load", function () {
        document.querySelector(".loader").classList.add("animating");
    });

    /*
    window.addEventListener('scroll', function () {
        var menu = document.querySelector('.menu');
        if (window.pageYOffset > 30) {
            menu.classList.add('fixed-menu');
        } else {
            menu.classList.remove('fixed-menu');
        }
    });
    */
}

export default base;
