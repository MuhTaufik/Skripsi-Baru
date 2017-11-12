var map = {};
var color = [];

function checkBoundaries(ctx, x, y, oldColor, imageData) {
    var width = ctx.canvas.clientWidth;
    var height = ctx.canvas.clientHeight;
    var res = 0;
    //ngambil warna di pixel currPixel
    var currentR = imageData.data[x * 4 + 0 + width * y * 4];
    var currentG = imageData.data[x * 4 + 1 + width * y * 4];
    var currentB = imageData.data[x * 4 + 2 + width * y * 4];

    //batasan canvas
    //ngecek warna sama warna old color
    //ngecek warna udah masuk atau belum
    if (x < ctx.canvas.clientWidth && x >= 0 && y < ctx.canvas.clientHeight && y >= 0) {
        if (oldColor['r'] == color['r'] && oldColor['g'] == color['g'] && oldColor['b'] == color['b']) {
            res = 0;
        } else if (oldColor['r'] == currentR && oldColor['g'] == currentG && oldColor['b'] == currentB) {
            res = 1;
        }
    }
    return res;
}

function floodfill(stack, map, ctx, oldColor, imageData) {
    var width = ctx.canvas.clientWidth;
    var height = ctx.canvas.clientHeight;

    while (stack.length > 0) {
        var curr = stack.pop();
        var currX = curr.x;
        var currY = curr.y;
        //console.log("x,y ", currX, currY);
        map[currX + "," + currY] = false;

        //true ada di dalem queue, false atau null ga ada di dalam queue
        imageData.data[((currY * (width * 4)) + (currX * 4)) + 0] = color.r;
        imageData.data[((currY * (width * 4)) + (currX * 4)) + 1] = color.g;
        imageData.data[((currY * (width * 4)) + (currX * 4)) + 2] = color.b;
        imageData.data[((currY * (width * 4)) + (currX * 4)) + 3] = 255;

        newX = currX + 1;
        newY = currY;
        if (checkBoundaries(ctx, newX, newY, oldColor, imageData) == 1) {
            if (!(map[(newX) + "," + (newY)] == true)) {
                stack.push({ x: newX, y: newY });
                map[(newX) + "," + (newY)] = true;
            }
        }
        newX = currX;
        newY = currY + 1;
        if (checkBoundaries(ctx, newX, newY, oldColor, imageData) == 1) {
            if (!(map[(newX) + "," + (newY)] == true)) {
                stack.push({ x: newX, y: newY });
                map[(newX) + "," + (newY)] = true;
            }
        }
        newX = currX - 1;
        newY = currY;
        if (checkBoundaries(ctx, newX, newY, oldColor, imageData) == 1) {
            if (!(map[(newX) + "," + (newY)] == true)) {
                stack.push({ x: newX, y: newY });
                map[(newX) + "," + (newY)] = true;
            }
        }
        newX = currX;
        newY = currY - 1;
        if (checkBoundaries(ctx, newX, newY, oldColor, imageData) == 1) {
            if (!(map[(newX) + "," + (newY)] == true)) {
                stack.push({ x: newX, y: newY });
                map[(newX) + "," + (newY)] = true;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}
