window.onload = function () {
    let count = Math.floor(Math.random() * 10000);
    count = count.toString();
    let output = "";
    for (let i = 0; i < count.length; i++) {
        output += '<span class="frame">' + count[i] + '</span>';
    }
    document.querySelector("#counter").innerHTML = output;
}