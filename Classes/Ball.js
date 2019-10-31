function Ball(object, angle) {
    this.object = object;
    this.angle = angle;
    this.createdAt = Date.now();

    this.move = function() {
        if (this.createdAt + 2000 < Date.now()) {
            scene.remove(this.object);
            player.balls.splice(player.balls.indexOf(this), 1);
        }
        this.object.position.z -= Math.cos(this.angle);
        this.object.position.x -= Math.sin(this.angle);
    }
}