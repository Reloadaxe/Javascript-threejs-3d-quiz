function Portal(object, object2, id) {
    this.object = object;
    this.object2 = object2;
    this.id = id;
    this.isOpen = false;

    this.open = function() {
        this.isOpen = true;
        this.object2.material.color.set("green");
    }

    this.close = function() {
        this.isOpen = false;
        this.object2.material.color.set("red");
    }

    this.teleport = function() {
        player.camera.position.x = 0;
        player.camera.position.y = 0;
        player.camera.position.z = 0;
        player.camera.rotation.y = 0;
        while(scene.children.length > 0){ 
            scene.remove(scene.children[0]); 
        }
        if (this.id == texts.length - 1) {
            createRoom(0, 0, 0, false);
            let loader = new THREE.FontLoader();

            loader.load( 'Fonts/font1.typeface.json', function ( font ) {

                let geometry = new THREE.TextGeometry("Your score is : " + player.score + "/20".toString(), {
                    font: font,
                    size: 80,
                    height: 5,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelOffset: 0,
                    bevelSegments: 5
                } );
                THREE.GeometryUtils.center(geometry);
                let material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
                let mesh = new THREE.Mesh( geometry, material );
                player.camera.position.z += 20;
                mesh.scale.x *= 0.03;
                mesh.scale.y *= 0.03;
                mesh.scale.z *= 0.03;
                mesh.position.y -= 2;
                lastText[0] = mesh;
                scene.add( mesh );
                let light = new THREE.SpotLight("green", 0.5, 100, Math.PI);
                light.position.set(0, -4, 0);

                scene.add(light);
            } );
        } else {
            createRoom(0, 0, 0, true);
            createPortal(24.4, -1, 0, 0, -Math.PI / 2, 0, 7, "red", this.id + 1);
            createPnj("[BOT] FAIP TIDE", -24, -5.3, 0, Math.PI / 2, 0.035, 0.035, 0.035, {x: -15, y: 1, z: 0, rotx: 0, roty: Math.PI / 2, rotz: 0}, texts[this.id + 1], {x: -24, y: 3, z: 2, rotx: 0, roty: Math.PI / 2, rotz: 0}, portal, 0);
        }
    }
}

function createPortal(x, y, z, rotationx, rotationy, rotationz, radius, color, id) {
    var geometry = new THREE.TorusGeometry( radius, 0.2, 16, 50, Math.PI * 2);
    var material = new THREE.MeshStandardMaterial( { color: "gray" } );
    var torus = new THREE.Mesh( geometry, material );
    torus.position.x = x;
    torus.position.y = y;
    torus.position.z = z;
    torus.rotation.x = rotationx;
    torus.rotation.y = rotationy;
    torus.rotation.z = rotationz;

    geometry = new THREE.CircleGeometry( radius, 32 );
    material = new THREE.MeshBasicMaterial( { color: color, transparent: true } );
    material.opacity = 0.2;
    var torus2 = new THREE.Mesh( geometry, material );
    torus2.position.x = x;
    torus2.position.y = y;
    torus2.position.z = z;
    torus2.rotation.x = rotationx;
    torus2.rotation.y = rotationy;
    torus2.rotation.z = rotationz;
    portal = new Portal(torus, torus2, id)
    scene.add(torus);
    scene.add(torus2);
}