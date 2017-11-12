$(".gambar1 img").click(function (e) {
    window.location = "../../partial/mewarnaiGambar.html"
    sessionStorage.setItem('img', e.target.src)
})

$(document).ready(function () {
    var canvas = $("#myCanvas");
    var ctx = canvas.get(0).getContext("2d");

    var img = new Image();
    // sessionStorage berguna untuk menyimpan data sementara pada browser untuk dapat digunakan kembali
    // data yang terdapat pada sessionStorage akan hilang jika tab/browser di close
    img.src = sessionStorage.getItem('img');
    img.onload = function () {//event handler
        ctx.drawImage(img, 0, 0);
    }


    canvas.click(function (e) {
        var offsetLeft = $(this).offset().left;
        var offsetTop = $(this).offset().top;
        //console.log(e.pageX, e.pageY);
        //console.log(offsetLeft, offsetTop)
        var x = parseInt(e.pageX - offsetLeft);
        var y = parseInt(e.pageY - offsetTop);
        console.log("COORDINATE: ", x, ",", y);

        var width = ctx.canvas.clientWidth;
        var height = ctx.canvas.clientWidth;

        var stack = [];
        stack.push({ x: x, y: y });
        ctx.fillStyle = "rgb(" + color['r'] + "," + color['g'] + "," + color['b'] + ")";

        var imageData = ctx.getImageData(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
        var currPixel = ctx.getImageData(x, y, 1, 1).data;
        var currentR = currPixel[0];
        var currentG = currPixel[1];
        var currentB = currPixel[2];

        var currRGB = {
            r: currentR,
            g: currentG,
            b: currentB
        };

        map[x + "," + y] = true;

        floodfill(stack, map, ctx, currRGB, imageData);

    });

    $("#blue").click(function () {
        color = { r: 0, g: 0, b: 255, a: 255 };
    });

    $("#red").click(function () {
        color = { r: 255, g: 0, b: 0, a: 255 };
    });

    $("#green").click(function () {
        color = { r: 0, g: 255, b: 0, a: 255 };
    });

    $("#black").click(function () {
        color = { r: 0, g: 0, b: 0, a: 255 };
    });

    $("#yellow").click(function () {
        color = { r: 255, g: 255, b: 0, a: 255 };
    });

    $("#orange").click(function () {
        color = { r: 255, g: 165, b: 0, a: 255 };
    });

    $("#pink").click(function () {
        color = { r: 255, g: 192, b: 203, a: 255 };
    });

    $("#brown").click(function () {
        color = { r: 165, g: 42, b: 42, a: 255 };
    });

    $("#lightblue").click(function () {
        color = { r: 173, g: 216, b: 230, a: 255 };
    });

    $("#purple").click(function () {
        color = { r: 128, g: 0, b: 128, a: 255 };
    });
});
