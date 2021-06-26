window.onload = function () {
    const count = Math.floor(Math.random() * 90000);
    let countStr = "00000000" + count.toString();
    countStr = countStr.slice(-8);
    let output = "";
    for (let i = 0; i < countStr.length; i++) {
        output += '<span class="frame">' + countStr[i] + '</span>';
    }
    document.querySelector("#counter").innerHTML = output;
}