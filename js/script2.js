let me = document.getElementById('stars');
let bg1 = document.getElementById('bg1');
let bg2 = document.getElementById('bg2');
let bg3 = document.getElementById('bg3');


const parallaxEls = document.querySelectorAll(".parallax");
let xValue = 0;
let yValue = 0;

window.addEventListener('mousemove', (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    parallaxEls.forEach(el => {
        const speed = el.getAttribute('data-speed');

        el.style.transform = `translateX(${-xValue * speed}px) translateY(${-yValue * speed}px)`;
    });
});
