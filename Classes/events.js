window.addEventListener("keydown", function(e) {
    if (!player.freeze) {
        if (e.key == "z")
            player.moving[0] = true;
        else if (e.key == "s")
            player.moving[1] = true;
        else if (e.key == "q")
            player.moving[2] = true;
        else if (e.key == "d")
            player.moving[3] = true;
        else if (e.keyCode == 37)
            player.turning[0] = true;
        else if (e.keyCode == 39)
            player.turning[1] = true;
        else if (e.keyCode == 32 && !player.jumping[0]) {
            player.jumping = [true, true];
            player.jumpingSpeed = 0.15;
        } else if (e.key == "v")
            player.camera.position.y = -2;
        else if (e.key == "x")
            player.camera.position.y = -4;
        else if (e.key == "t")
            player.fluidMoveTo = {x: -player.camera.position.x, y: -player.camera.position.y, z: -player.camera.position.z, rotx: -player.camera.rotation.x, roty: -player.camera.rotation.y, rotz: -player.camera.rotation.z};
    } else if (player.talkingWith) {
        if (player.talkingWith.canTalk) {
            if (e.keyCode == 38) {
                document.getElementById("a" + player.talkingWith.chooseIndex).style.color = "white";
                if (player.talkingWith.chooseIndex == 0)
                    player.talkingWith.chooseIndex = 3;
                else
                    player.talkingWith.chooseIndex--;
                document.getElementById("a" + player.talkingWith.chooseIndex).style.color = "#e67e22";
            } else if (e.keyCode == 40) {
                document.getElementById("a" + player.talkingWith.chooseIndex).style.color = "white";
                if (player.talkingWith.chooseIndex == 3)
                    player.talkingWith.chooseIndex = 0;
                else
                    player.talkingWith.chooseIndex++;
                document.getElementById("a" + player.talkingWith.chooseIndex).style.color = "#e67e22";
            } else if (e.keyCode == 13) {
                player.talkingWith.canTalk = false;
                player.talkingWith.activeWhat.open();
                questionId++;
                if (player.talkingWith.chooseIndex != player.talkingWith.texts.goodAnswer)
                    document.getElementById("a" + player.talkingWith.chooseIndex).style.color = "red";
                else
                    player.score++;
                document.getElementById("score").innerText = "Score : " + player.score + " / " + questionId;
                document.getElementById("a" + player.talkingWith.texts.goodAnswer).style.color = "green";
            }
        }
        if (e.keyCode == 27) {
            document.getElementById("backgroundDiv").childNodes.forEach(node => {
                document.getElementById("backgroundDiv").removeChild(node);
            });
            player.moving = [false, false, false, false];
            player.turning = [false, false];
            player.fluidMoveTo = {x: -player.camera.position.x, y: -player.camera.position.y, z: -player.camera.position.z, rotx: -player.camera.rotation.x, roty: -player.camera.rotation.y, rotz: -player.camera.rotation.z};
            player.freeze = false;
        }
    }
});

window.addEventListener("keyup", function(e) {
    if (!player.freeze) {
        if (e.key == "z")
            player.moving[0] = false;
        else if (e.key == "s")
            player.moving[1] = false;
        else if (e.key == "q")
            player.moving[2] = false;
        else if (e.key == "d")
            player.moving[3] = false;
        else if (e.keyCode == 37)
            player.turning[0] = false;
        else if (e.keyCode == 39)
            player.turning[1] = false;
        else if (e.key == "v")
            player.camera.position.y = 0;
        else if (e.key == "x")
            player.camera.position.y = 0;
    }
});