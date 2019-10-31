function PlaySound(audio){
    var listener = new THREE.AudioListener();
    player.camera.add( listener );
    var sound = new THREE.Audio( listener );
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( audio, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( false );
        sound.setVolume(1);
        sound.play();
    });
}

function Player() {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.moving = [false, false, false, false];
    this.turning = [false, false, false, false];
    this.jumping = [false, false];
    this.jumpingSpeed = 0;
    this.collideBox;
    this.colliding = [false, false, false, false];
    this.freeze = false;
    this.moved = 0;
    this.fluidMoveTo;
    this.talkingWith;
    this.score = 0;

    this.moveCollideBox = function() {
        var xsize = 3;
        var ysize = 6;
        var zsize = 3;
        var geometry = new THREE.BoxGeometry( xsize, ysize, zsize, 10, 10, 10 );
        var material = new THREE.MeshBasicMaterial( {color: "black"} );
        this.collideBox = new THREE.Mesh( geometry, material );
        this.collideBox.position.x = this.camera.position.x;
        this.collideBox.position.y = -5 + ysize / 2;
        this.collideBox.position.z = this.camera.position.z;
    }

    this.jump = function() {
        if (this.jumping[1]) {
            if (this.jumpingSpeed < 0.01) {
                this.jumping[1] = false;
            } else {
                this.camera.position.y += this.jumpingSpeed;
                this.jumpingSpeed *= 0.9;
            }
        } else {
            if (this.camera.position.y < 0.01) {
                this.camera.position.y = 0;
                this.jumping[0] = false;
            } else {
                this.camera.position.y -= this.jumpingSpeed;
                this.jumpingSpeed *= 1.1;
            }
        }
    }

    this.move = function() {
        if (this.fluidMoveTo != undefined) { 
            if (this.moved == 0) {
                this.fluidMoveTo.rotx %= Math.PI * 2;
                this.fluidMoveTo.roty %= Math.PI * 2;
                this.fluidMoveTo.rotz %= Math.PI * 2;
            }
            this.camera.position.x += this.fluidMoveTo.x / 50;
            this.camera.position.y += this.fluidMoveTo.y / 50;
            this.camera.position.z += this.fluidMoveTo.z / 50;
            this.camera.rotation.x += this.fluidMoveTo.rotx / 50;
            this.camera.rotation.y += this.fluidMoveTo.roty / 50;
            this.camera.rotation.z += this.fluidMoveTo.rotz / 50;
            this.moved++;
            if (this.moved >= 50) {
                this.fluidMoveTo = undefined;
                this.moved = 0;
            }
        } else if (!this.freeze) {
            if (this.moving[0] || this.moving[1] || this.moving[2] || this.moving[3]) {
                this.moveCollideBox();
                this.collide0();
                this.collide1();
                this.collide2();
                this.collide3();
                if (collideBetween(portal.object, this.collideBox) && portal.isOpen)
                    portal.teleport();
                if (collideBetween(this.collideBox, pnj.collideBox))
                    pnj.talk();
            }
            if (this.moving[0]) {
                if (!this.colliding[0] && Math.cos(this.camera.rotation.y) > 0 || !this.colliding[1] && Math.cos(this.camera.rotation.y) < 0)
                    this.camera.position.z -= 0.2 * Math.cos(this.camera.rotation.y);
                if (!this.colliding[2] && Math.sin(this.camera.rotation.y) > 0 || !this.colliding[3] && Math.sin(this.camera.rotation.y) < 0)
                    this.camera.position.x -= 0.2 * Math.sin(this.camera.rotation.y);
            } 
            if (this.moving[1]) {
                if (!this.colliding[0] && Math.cos(this.camera.rotation.y) < 0 || !this.colliding[1] && Math.cos(this.camera.rotation.y) > 0)
                    this.camera.position.z += 0.2 * Math.cos(this.camera.rotation.y);
                if (!this.colliding[2] && Math.sin(this.camera.rotation.y) < 0 || !this.colliding[3] && Math.sin(this.camera.rotation.y) > 0)
                    this.camera.position.x += 0.2 * Math.sin(this.camera.rotation.y);
            }
            if (this.moving[2]) {
                if (!this.colliding[2] && Math.cos(this.camera.rotation.y) > 0 || !this.colliding[3] && Math.cos(this.camera.rotation.y) < 0)
                    this.camera.position.x -= 0.2 * Math.cos(this.camera.rotation.y);
                if (!this.colliding[0] && Math.sin(this.camera.rotation.y) < 0 || !this.colliding[1] && Math.sin(this.camera.rotation.y) > 0)
                    this.camera.position.z += 0.2 * Math.sin(this.camera.rotation.y);
            }
            if (this.moving[3]) {
                if (!this.colliding[2] && Math.cos(this.camera.rotation.y) < 0 || !this.colliding[3] && Math.cos(this.camera.rotation.y) > 0)
                    this.camera.position.x += 0.2 * Math.cos(this.camera.rotation.y);
                if (!this.colliding[0] && Math.sin(this.camera.rotation.y) > 0 || !this.colliding[1] && Math.sin(this.camera.rotation.y) < 0)
                    this.camera.position.z -= 0.2 * Math.sin(this.camera.rotation.y);
            }
            if (this.jumping[0])
                this.jump();
            if (this.turning[0])
                this.camera.rotation.y += 0.05;
            if (this.turning[1])
                this.camera.rotation.y -= 0.05;
        }
    }

    this.collide0 = function() {
        this.colliding[0] = false;
        walls[0].forEach(wall => {
            var wallObj = new THREE.Box3().setFromObject(wall.object);
            var playerObj = new THREE.Box3().setFromObject(this.collideBox);
            if (playerObj.max.x < wallObj.max.x && playerObj.min.x > wallObj.min.x && playerObj.min.z <= wallObj.max.z && playerObj.max.z >= wallObj.min.z) {
                this.colliding[0] = true;
                return (true);
            }
        });
        return (false);
    }

    this.collide1 = function() {
        this.colliding[1] = false;
        walls[1].forEach(wall => {
            var wallObj = new THREE.Box3().setFromObject(wall.object);
            var playerObj = new THREE.Box3().setFromObject(this.collideBox);
            if (playerObj.max.x < wallObj.max.x && playerObj.min.x > wallObj.min.x && playerObj.max.z >= wallObj.min.z && playerObj.min.z <= wallObj.max.z) {
                this.colliding[1] = true;
                return (true);
            }
        });
        return (false);
    }

    this.collide2 = function() {
        this.colliding[2] = false;
        walls[2].forEach(wall => {
            var wallObj = new THREE.Box3().setFromObject(wall.object);
            var playerObj = new THREE.Box3().setFromObject(this.collideBox);
            if (playerObj.max.z < wallObj.max.z && playerObj.min.z > wallObj.min.z && playerObj.min.x <= wallObj.max.x && playerObj.max.x >= wallObj.min.x) {
                this.colliding[2] = true;
                return (true);
            }
        });
        return (false);
    }

    this.collide3 = function() {
        this.colliding[3] = false;
        walls[3].forEach(wall => {
            var wallObj = new THREE.Box3().setFromObject(wall.object);
            var playerObj = new THREE.Box3().setFromObject(this.collideBox);
            if (playerObj.max.z < wallObj.max.z && playerObj.min.z > wallObj.min.z && playerObj.max.x >= wallObj.min.x && playerObj.min.x <= wallObj.max.x) {
                this.colliding[3] = true;
                return (true);
            }
        });
        return (false);
    }

    this.moveCollideBox();
}