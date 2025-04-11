const button = document.querySelector("button"),
    toast = document.querySelector(".toast");
(closeIcon = document.querySelector(".close")),
    (progress = document.querySelector(".progress"));

let timer1, timer2;

let text1 = document.querySelector(".text-1");
let text2 = document.querySelector(".text-2");

let check = document.querySelector(".check");
let xmark = document.querySelector(".xmark");



function popupSuccess(title, message) {
    text1.innerText = title;
    text2.innerText = message;

    check.style.display = 'flex';
    xmark.style.display = 'none';

    document.documentElement.style.setProperty('--statusColor', 'green');

    toast.classList.add("active");
    progress.classList.add("active");

    timer1 = setTimeout(() => {
        toast.classList.remove("active");
    }, 2500); //1s = 1000 milliseconds

    timer2 = setTimeout(() => {
        progress.classList.remove("active");
    }, 2800);
}

function popupFail(title, message) {
    text1.innerText = title;
    text2.innerText = message;

    check.style.display = 'none';
    xmark.style.display = 'flex';

    document.documentElement.style.setProperty('--statusColor', 'red');

    toast.classList.add("active");
    progress.classList.add("active");

    timer1 = setTimeout(() => {
        toast.classList.remove("active");
    }, 2500); //1s = 1000 milliseconds

    timer2 = setTimeout(() => {
        progress.classList.remove("active");
    }, 2800);
}
closeIcon.addEventListener("click", () => {
    toast.classList.remove("active");

    setTimeout(() => {
        progress.classList.remove("active");
    }, 300);

    clearTimeout(timer1);
    clearTimeout(timer2);
});

window.popupSuccess = popupSuccess;
window.popupFail = popupFail;