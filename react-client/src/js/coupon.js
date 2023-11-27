document.addEventListener("DOMContentLoaded", function () {
    const fontSizeInput = document.getElementById("fontSize");
    const textColorInput = document.getElementById("textColor");
    const bgColorInput = document.getElementById("bgColor");
    const content = document.getElementById("h1");
    const content2 = document.getElementById("othertext");

    fontSizeInput.addEventListener("input", function () {
        content.style.fontSize = fontSizeInput.value + "px";
        content2.style.fontSize = fontSizeInput.value/4 + "px";
    });

    textColorInput.addEventListener("input", function () {
        content.style.color = textColorInput.value;
        content2.style.color = textColorInput.value;
    });

    bgColorInput.addEventListener("input", function () {
        document.body.style.backgroundColor = bgColorInput.value;
        content2.body.style.backgroundColor = bgColorInput.value;
    });
});
