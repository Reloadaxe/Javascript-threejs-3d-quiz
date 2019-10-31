function Wall(object) {
    this.object = object;
}

function createCube(x, y, z, color) {
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshPhongMaterial( { color: color } );
    var cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    cube.receiveShadow = true;
    
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    return (cube);
}

function createWallAroundMap(width, depth, height, rotation, x, y, z, arrTab) {
    var loader = new THREE.TextureLoader();
    var texture = loader.load("Images/falseroof.png");
    var geometry = new THREE.BoxGeometry( width, height, depth, 10, 10, 10 );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( width / 8, height / 8);
    var cube = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color: 0xffffff, map: texture, shininess: 0}) );
    cube.castShadow = true;
    cube.receiveShadow = true;
    
    cube.rotation.y = rotation;

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    walls[arrTab].push(new Wall(cube));
    scene.add(cube);
}