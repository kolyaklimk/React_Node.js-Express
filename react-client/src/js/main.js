const itemLeft = document.querySelector('#item_left');
const itemRight = document.querySelector('#item_right');
const text = document.querySelector('#text');

window.addEventListener('scroll',()=>{
    let value = scrollY;
    itemLeft.style.left = `-${value/0.7}px`;
    itemRight.style.left = `${value/0.7}px`;
    text.style.bottom = `-${value}px`;
});