function createObjLight(rotation, lightx, lighty, lightz) {
    var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load( 'Models/lamp2/CONTE AP1.mtl', function( materials ) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( 'Models/lamp2/CONTE AP1.obj', function ( mesh ) {
            mesh.scale.x *= 10;
            mesh.scale.y *= 10;
            mesh.scale.z *= 10;
            mesh.position.x = lightx;
            mesh.position.y = lighty;
            mesh.position.z = lightz;
            mesh.rotation.y = rotation;
            scene.add(mesh);
        });
    });
}

function createLight(x, y, z, intensity, rotation, lightx, lighty, lightz) {
    createObjLight(rotation, lightx, lighty, lightz);

    var light2 = new THREE.SpotLight("white", intensity, 100, Math.PI);
    light2.position.set(x, y, z);

    scene.add(light2);
}