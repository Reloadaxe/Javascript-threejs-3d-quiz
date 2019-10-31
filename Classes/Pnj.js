function Pnj(name, object, collideBox, moveTo, texts, pos, activeWhat) {
    this.object = object;
    this.collideBox = collideBox;
    this.moveTo = moveTo;
    this.texts = texts;
    this.pos = pos;
    this.chooseIndex = 0;
    this.name = name;
    this.canTalk = true;
    this.activeWhat = activeWhat;

    this.drawText = function() {
        var Title = this.name;

        var Question = this.texts.question.toUpperCase();
        var Answers = this.texts.answers;

        var Settings = {color: 'rgba(0,0,0,0.8)', width: '80%', height: '80%', 
        topBar: {
            color: 'red',
            width: '100%',
            height: '10%'
        }, bottomBar : {
            color: 'red',
            width: '100%',
            height: '2%'
        }};
        var Top = document.createElement('top');
        var Menu = document.createElement('menu');
        var Bottom = document.createElement('bottom');
        var Middle = document.createElement("middle");

        var MenuTitle = document.createElement('h1');
        MenuTitle.innerText = Title;

        var MenuQuestion = document.createElement('h1');
        MenuQuestion.innerText = Question;
        MenuQuestion.style.fontSize = "30px";
        MenuQuestion.style.marginTop = "10%";


        var body = document.getElementById("backgroundDiv");

        Menu.appendChild(Top);
        Top.appendChild(MenuTitle);
        body.appendChild(Menu);
        Menu.appendChild(Middle);
        Middle.appendChild(MenuQuestion);
        Menu.appendChild(Bottom);

        for (let i = 0; i < 4; i++) {
            var MenuAnswer = document.createElement("h2");
            MenuAnswer.innerText = String.fromCharCode(i + 65) + " - " + Answers[i].toUpperCase();
            MenuAnswer.id = "a" + i;
            MenuAnswer.style.fontSize = "20px";
            MenuAnswer.style.fontFamily = "Segoe UI,sans-serif";
            MenuAnswer.style.marginTop = "5%";
            if (this.canTalk)
                MenuAnswer.style.color = (i == this.chooseIndex) ? "#e67e22" : "white";
            else {
                if (this.texts.goodAnswer == i)
                    MenuAnswer.style.color = "green";
                else if (this.chooseIndex == i)
                    MenuAnswer.style.color = "red";
                else
                    MenuAnswer.style.color = "white";
            }
            MenuAnswer.style.textAlign = "center";
            
            Middle.appendChild(MenuAnswer);
        }

        MenuTitle.style.fontFamily = 'sans-serif';
        MenuTitle.style.position = 'relative';
        MenuTitle.style.textAlign = 'center';
        MenuTitle.style.top = '-10px';
        MenuTitle.style.color = 'white';

        MenuQuestion.style.fontFamily = 'sans-serif';
        MenuQuestion.style.position = 'relative';
        MenuQuestion.style.textAlign = 'center';
        MenuQuestion.style.top = '10%';
        MenuQuestion.style.color = 'white';

        //Menu Back
        Menu.style.position = 'absolute';
        Menu.style.backgroundColor = Settings.color;
        Menu.style.top = '5%';
        Menu.style.left = '10%';
        Menu.style.width = Settings.width;
        Menu.style.height = Settings.height;
        Menu.style.borderTopRightRadius = '15px';
        Menu.style.borderTopLeftRadius = '15px';

        //TopBar
        Top.style.position = 'absolute';
        Top.style.backgroundColor = Settings.topBar.color;
        Top.style.width = Settings.topBar.width;
        Top.style.height = Settings.topBar.height;
        Top.style.left = '0';
        Top.style.borderTopRightRadius = '15px';
        Top.style.borderTopLeftRadius = '15px';

        //BottomBar
        Bottom.style.position = 'absolute';
        Bottom.style.backgroundColor = Settings.bottomBar.color;
        Bottom.style.width = Settings.bottomBar.width;
        Bottom.style.height = Settings.bottomBar.height;
        Bottom.style.top = '100%';
        Bottom.style.left = '0';
    }

    this.talk = function() {
        let moveTo = {
            x: this.moveTo.x - player.camera.position.x, 
            y: this.moveTo.y - player.camera.position.y, 
            z: this.moveTo.z - player.camera.position.z, 
            rotx: this.moveTo.rotx -  player.camera.rotation.x, 
            roty: this.moveTo.roty - player.camera.rotation.y, 
            rotz: this.moveTo.rotz - player.camera.rotation.z
        };
        player.talkingWith = this;
        player.fluidMoveTo = moveTo;
        player.freeze = true;
        this.drawText();
    }
}

function createPnj(name, x, y, z, rotation, sizex, sizey, sizez, moveTo, texts, textPos, activeWhat) {
    var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load( 'Models/Femadroid/walking.mtl', function( materials ) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( 'Models/Femadroid/walking.obj', function ( mesh ) {
            mesh.scale.x *= sizex;
            mesh.scale.y *= sizey;
            mesh.scale.z *= sizez;
            mesh.position.x = x;
            mesh.position.y = y;
            mesh.position.z = z;
            mesh.rotation.y = rotation;
            var geometry = new THREE.TorusGeometry(5, 0.15, 20, 50, Math.PI * 2);
            var material = new THREE.MeshPhongMaterial( { color: "yellow" } );
            var torus = new THREE.Mesh( geometry, material );
            torus.position.x = x;
            torus.position.y = y + 0.2;
            torus.position.z = z;
            torus.rotation.x = Math.PI / 2;

            geometry = new THREE.CircleGeometry( 5, 32 );
            material = new THREE.MeshBasicMaterial( { color: "yellow", transparent: true } );
            material.opacity = 0.2;
            var torus2 = new THREE.Mesh( geometry, material );
            torus2.position.x = x;
            torus2.position.y = y + 0.35;
            torus2.position.z = z;
            torus2.rotation.x = -Math.PI / 2;
            pnj = new Pnj(name, mesh, torus, moveTo, texts, textPos, activeWhat);
            scene.add(torus);
            scene.add(torus2);
            scene.add(mesh);
        });
    });
}