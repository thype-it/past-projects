const els = document.querySelectorAll(".anim");
var animation = "whyOmegaIns";
let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.5, 0]
}


observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animation = entry.target.className.split(" ")[0] + "In";
            animation = animation.replace(/\s/g, '');
            if (entry.target.classList.contains(animation)){
                repair(entry.target, animation);
                setTimeout(function () {
                    entry.target.className += " " + animation;
                }, 100)
                entry.target.children[0].style.animation = 'fadeIn 1.3s forwards ease-in';
            }else {
                entry.target.children[0].style.animation = 'fadeIn 1.3s forwards ease-in';
                entry.target.className += " " + animation;
            }
        }
        else {
            entry.target.children[0].style.animation = 'none';
            entry.target.classList.remove(animation);
        }
    })
})

els.forEach(el => {
    observer.observe(el)
})


function repair(current, clas) {
    current.classList.remove(clas);
}