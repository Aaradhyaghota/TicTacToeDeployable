let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let startbtn = document.querySelector("#start");
let messHeading = document.querySelector("#message");
let messBox = document.querySelector(".message");

let turnO = true; // true-> o ,false -> x

const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
]

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
    }
}


resetbtn.addEventListener("click", () => {
    for (let box of boxes) {
        box.innerText = "";
    }
    enableBoxes();
});

startbtn.addEventListener("click", () => {
    messBox.classList.add('hidden');
    resetbtn.disabled = false;
    for (let box of boxes) {
        box.innerText = "";
    }
    enableBoxes();
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
        }
        else {
            box.innerText = "X";
        }
        box.disabled = true;

        turnO = !turnO;

        checkWinner();
        checkDraw();
    });
});

const checkDraw = () => {
    let cnt = 0;
    for (box of boxes) {
        if (box.innerText != "") {
            cnt++;
        }
    }
    if (cnt === 9) {
        messHeading.innerText = "Match Over";
        messBox.classList.remove('hidden');
        disableBoxes();
        resetbtn.disabled = true;
    }
    else return;
}

const checkWinner = () => {
    for (let pattern of winningPattern) {

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val == pos3val) {
                messHeading.innerText = `${pos1val} is winner`;
                messBox.classList.remove('hidden');
                disableBoxes();
                resetbtn.disabled = true;
            }
        }
    }
}
