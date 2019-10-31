function addPlane(sizex, sizez, posx, posy, posz, rotx, image, shininess) {
    var geometry = new THREE.PlaneGeometry( sizex, sizez );
    var loader = new THREE.TextureLoader();
    var texture = loader.load(image);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( sizex / 10, sizez / 10);
    var material = new THREE.MeshPhongMaterial( {map: texture, shininess: shininess} );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.x = posx;
    plane.position.z = posz;
    plane.rotation.x = rotx;
    plane.position.y = posy;
    plane.receiveShadow = true;
    scene.add( plane );
}