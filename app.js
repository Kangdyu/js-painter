const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const palette = document.querySelector(".menu__palette");
const range = document.querySelector(".brush-size");
const modeBtn = document.querySelector(".btn-mode");
const saveBtn = document.querySelector(".btn-save");

canvas.width = 600;
canvas.height = 600;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;

let isPainting = false;
let isFilling = false;

function stopPainting() {
    isPainting = false;
}

function startPainting() {
    isPainting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!isPainting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function canvasClickHandler() {
    if (isFilling) ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function colorHandler(event) {
    if (event.target.classList.contains("menu__color")) {
        const color = event.target.style.backgroundColor;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }
}

function sizeHandler(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function modeHandler() {
    if (isFilling === true) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function saveHandler() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "yourAwesomePaint";
    link.click();
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", canvasClickHandler);

palette.addEventListener("click", colorHandler);

range.addEventListener("input", sizeHandler);

modeBtn.addEventListener("click", modeHandler);

saveBtn.addEventListener("click", saveHandler);
