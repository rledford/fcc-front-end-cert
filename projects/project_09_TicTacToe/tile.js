
function Tile (left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.color = "rgb(255, 0, 0)";
    this.texture = null;
    this.val = null;
}

Tile.prototype.contains = function (point) {
    return (point.x > this.left && point.x < this.left+this.width &&
           point.y > this.top && point.y < this.top+this.height);
}

Tile.prototype.draw = function (dest) {
    //destination should be a canvas 2d context
    if(this.texture){
        dest.drawImage(this.texture, this.left, this.top, this.width, this.height);
    }
}

Tile.prototype.occupy = function (val, texture){
    this.texture = texture;
    this.val = val;
}

Tile.prototype.reset = function () {
    this.texture = null;
    this.val = null;
}