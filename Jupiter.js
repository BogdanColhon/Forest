
var scene, camera, renderer;
var geometry,geometry2, material,materialJupiter;
var wireGeometry, wireMaterial;
var grid;
var initiater = 0;
var score = 588000000;
var topScore = 587999996;
var FullBoxSize;
let flash, star, starGeo, starCount = 15000;
var mat;
var textureLoader,textureJupiter;
var textureURL = "https://i.imgur.com/Yb1Tfiy.jpg"; 
var done1=1;
var done2=1;
var done3=1;
var done4=1;
var done=10;
var emptyNum=0;

var Blocks;
var empty;

document.onkeydown = inputKey;
window.onresize = WindowResize;

init();
animate();

function init() {
    done1=1;
    done2=1;
    done3=1;
    done4=1;
    emptyNum=0;
    document.onkeydown = inputKey;
    document.getElementById("end2").innerHTML = "";
    FullBoxSize = new THREE.Vector3(1, 1, 0.01);
    score = 587999996;
    //Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 5;
    camera.position.x = 5.3;
    camera.position.y = 1.5;

    //Lighting
    
    directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(-100, 10,50);
    scene.add(directionalLight);
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 0, 0 );
    scene.add( hemiLight );

    //Stars
    starGeo = new THREE.Geometry();
    for (let i = 0; i < starCount; i++) {
        starElem = new THREE.Vector3(
            Math.random() * 400 - 200,
            Math.random() * 500 - 250,
            Math.random() * 400 - 200
        );
        starElem.velocity = {};
        starElem.velocity = 0;
        starGeo.vertices.push(starElem);
    }
    starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.3,
        transparent: true
    });
    star = new THREE.Points(starGeo, starMaterial);
    scene.add(star);


    //Geometry
    geometry = new THREE.BoxGeometry(0.9, 0.9, 0.01);
    geometry2 = new THREE.SphereGeometry( 2.8,190,190 );
    textureLoader = new THREE.TextureLoader();
    textureJupiter = textureLoader.load( textureURL );
    materialJupiter = new THREE.MeshPhongMaterial ( 
        { color: 0xffffff ,
            map: textureJupiter ,
             reflectivity:0, 
             shininess :0
        } 
      
      );
    jupiter = new THREE.Mesh( geometry2, materialJupiter );
      jupiter.rotation.x = 3.1415*0.02;
      jupiter.rotation.y = 3.1415*1.54;



    //Text Textures
    var dynamicTexture = [];
    for (var i = 0; i < 14; i++) {

        dynamicTexture[i] = new THREEx.DynamicTexture(128, 128);
        dynamicTexture[i].clear('white');


        if ((Math.pow(5, i) > 0) && (Math.pow(5, i) < 10)) {
            //1 digit text
            dynamicTexture[i].context.font = "120px monospace";
            dynamicTexture[i].drawText(Math.pow(5, i), 30, 100, 'black');
        } else if ((Math.pow(5, i) > 10) && (Math.pow(5, i) < 100)) {
            //2 digit text
            dynamicTexture[i].context.font = "100px monospace";
            dynamicTexture[i].drawText(Math.pow(5, i), 8, 96, 'black');
        } else if ((Math.pow(5, i) > 100) && (Math.pow(5, i) < 1000)) {
            //3 digit text
            dynamicTexture[i].context.font = "70px monospace";
            dynamicTexture[i].drawText(Math.pow(5, i), 6, 86, 'black');
        } else if (Math.pow(5, i) > 1000 && (Math.pow(5, i) < 10000)) {
            //4 digit text
            dynamicTexture[i].context.font = "50px monospace";
            dynamicTexture[i].drawText(Math.pow(5, i), 8, 84, 'black');
        } else if (Math.pow(5, i) > 10000 && (Math.pow(5, i) < 100000)) {
            //5 digit text
            dynamicTexture[i].context.font = "40px monospace";
            dynamicTexture[i].drawText(Math.pow(5, i), 8, 82, 'black');
        } else if (Math.pow(5, i) > 100000 && (Math.pow(5, i) < 1000000)) {
            //6 digit text
            dynamicTexture[i].context.font = "35px monospace";
            dynamicTexture[i].drawText(Math.pow(5, i), 6, 80, 'black');
        }else if (Math.pow(5, i) > 1000000 && (Math.pow(5, i) < 10000000)) {
        //7 digit text
        dynamicTexture[i].context.font = "30px monospace";
        dynamicTexture[i].drawText(Math.pow(5, i), 6, 76, 'black');
        }else if (Math.pow(5, i) > 10000000 && (Math.pow(5, i) < 100000000)){
        //8 digit text
            dynamicTexture[i].context.font = "27px monospace";
            dynamicTexture[i].drawText(Math.pow(5, i), 6, 76, 'black');
        }else if (Math.pow(5, i) > 100000000) {
        //9 digit text
                dynamicTexture[i].context.font = "24px monospace";
                dynamicTexture[i].drawText(Math.pow(5, i), 6, 76, 'black');
                }
        else {

            dynamicTexture[i].context.font = "30px monospace";
            dynamicTexture[i].drawText(Math.pow(5, i), 8, 80, 'red');
        }

        console.log(Math.pow(5, i));
        dynamicTexture[i].texture.needsUpdate = true;
    }


    //Block Materials
    mat = new Array(14);

    mat[0] = new THREE.MeshBasicMaterial({
        color: 0xe6e6e6,
        map: dynamicTexture[1].texture
    });
    mat[1] = new THREE.MeshBasicMaterial({
        color: 0x808080,
        map: dynamicTexture[2].texture
    });
    mat[2] = new THREE.MeshBasicMaterial({
        color: 0x595959,
        map: dynamicTexture[3].texture
    });
    mat[3] = new THREE.MeshBasicMaterial({
        color: 0xb3b3ff,
        map: dynamicTexture[4].texture
    });
    mat[4] = new THREE.MeshBasicMaterial({
        color: 0x8080ff,
        map: dynamicTexture[5].texture
    });
    mat[5] = new THREE.MeshBasicMaterial({
        color: 0x4d4dff,
        map: dynamicTexture[6].texture
    });
    mat[6] = new THREE.MeshBasicMaterial({
        color: 0xffb3ff,
        map: dynamicTexture[7].texture
    });
    mat[7] = new THREE.MeshBasicMaterial({
        color: 0xe600e6,
        map: dynamicTexture[8].texture
    });
    mat[8] = new THREE.MeshBasicMaterial({
        color: 0xcc0099,
        map: dynamicTexture[9].texture
    });
    mat[9] = new THREE.MeshBasicMaterial({
        color: 0x66ffff,
        map: dynamicTexture[10].texture
    });
    mat[10] = new THREE.MeshBasicMaterial({
        color: 0x00b3b3,
        map: dynamicTexture[11].texture
    });
    mat[11] = new THREE.MeshBasicMaterial({
        color: 0xffff1a,
        map: dynamicTexture[12].texture
    });
   



    Blocks = new Array(13);

    for (var i = 0; i < 14; i++) {

        Blocks[i] = new THREE.Mesh(geometry, mat[i]);
        Blocks[i].name = Math.pow(5,i+1) + "";
    }




    //Empty blocks
    wireGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.01);
    wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });

    empty = new THREE.Mesh(wireGeometry, wireMaterial);
    empty.name = "empty";

    //5x5 array with blocks
    grid = new Array(5);
    for (var j = 0; j < 5; j++) {
        grid[j] = new Array(5);
        for (var i = 0; i < 5; i++) {

            grid[j][i] = empty.clone();

        }
    }


    //Backplanes
    var BackGeometry = new THREE.BoxGeometry(0.89, 0.89, 0.01);
    var BackColor = new THREE.Color(0xffffff);
    var BackJom = new THREE.BoxGeometry(5.2, 5.2, 0.01);
    var BackCol = new THREE.Color(0x2d323b);
    var BackMat = new THREE.MeshBasicMaterial({
        color: BackCol
    });
    var sq = new THREE.Mesh(BackJom, BackMat);
    sq.position.x = 1.5;
    sq.position.y = 1.5;
    sq.position.z = -0.01;
    scene.add(sq);
    jupiter.position.x = 7.5;
    jupiter.position.y = 1.5;
    jupiter.position.z = +0.01;
    scene.add( jupiter );

    for (var j = 0; j < 5; j++) {
        for (var i = 0; i < 5; i++) {

            var BackMaterial = new THREE.MeshBasicMaterial({
                color: BackColor
            });
            var Backplane = new THREE.Mesh(BackGeometry, BackMaterial);

            Backplane.position.x = i-0.5;
            Backplane.position.y = j-0.5;
            Backplane.position.z = -0.01;
            scene.add(Backplane);
        }
    }


    //Run only once
    if (initiater == 0) {
        renderer = new THREE.WebGLRenderer({
            alpha: 1
        });
        scene.fog = new THREE.FogExp2(0x111111, 0.002);
        renderer.setClearColor(scene.fog.color);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        initiater = 1;
    }



    //Add initial block and update score board
    AddRandom();
    UpdateScore();
    UpdateTopScore();


}

//animation loop
function animate() {

    starGeo.vertices.forEach(p => {
        p.velocity = 1;
    });
    starGeo.verticesNeedUpdate = true;
    star.rotation.y += 0.0001;
    jupiter.rotation.y += 0.00004;
   

    requestAnimationFrame(animate);
    Update();
    renderer.render(scene, camera);

}


//Block smooth move
function Update() {

    for (var j = 0; j < 5; j++) {
        for (var i = 0; i < 5; i++) {

            if (grid[j][i] != null) {

                grid[j][i].position.lerp(new THREE.Vector3(i-0.5, j-0.5, 0), 0.2);
                grid[j][i].scale.lerp(FullBoxSize, 0.1);
            }
        }
    }
}

//Keyboard Inputs
function inputKey(event) {
    "use strict";
    event = event || window.event;

    //keep track if any change has been done
    var change = 0;
   
    
    if (event.keyCode == '37') {
        //left arrow
        change += HorizontalMerge();
        change += MoveLeft();
        done4=change;
        if (change > 0) {
           AddRandom();
        }
        

    } else if (event.keyCode == '38') {
        //up arrow
        change += VerticalMerge();
        change += MoveUp();
        done1=change;
        if (change > 0) {
            AddRandom();
        }
        
    } else if (event.keyCode == '39') {
        //right arrow
        change += HorizontalMerge();
        change += MoveRight();
       done2=change;
        if (change > 0) {
            AddRandom();
        }
        
    } else if (event.keyCode == '40') {
        //down arrow
        change += VerticalMerge();
        change += MoveDown();
       done3=change;
        if (change > 0) {
            AddRandom();
        }
        
    } else if (event.keyCode == '13 ') {
        //Enter key
        init();
    }else if(event.keyCode=='77')
    {
        window.location = "menu.html";

    }

    done=done1+done2+done3+done4;
    if(done==0)
    {
        
    for (var j = 0; j < 5; j++) {
        for (var i = 0; i < 5; i++) {

            if (grid[j][i].name == "empty") 
            {
                emptyNum++;
            }
        }
    }
        if(emptyNum==0)
        {
        failedGame();
        }
    }

    UpdateScore();
   
    if (score <= topScore) {
        topScore = score;
        UpdateTopScore();
    }
   

}

function WindowResize(event) {
    event = event || window.event;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

//Add block after each move
function AddRandom() {


    var location = [];

    for (var j = 0; j < 5; j++) {
        for (var i = 0; i < 5; i++) {

            if (grid[j][i].name == "empty") {

                location.push([i, j]);
            }
        }
    }

    if (location.length > 0) {

        var random = location[Math.floor(Math.random() * location.length)];
        scene.remove(grid[random[1]][random[0]]);

        grid[random[1]][random[0]] = Blocks[0].clone();

        grid[random[1]][random[0]].position.x = random[0];
        grid[random[1]][random[0]].position.y = random[1];
        grid[random[1]][random[0]].scale.x = 0.1;
        grid[random[1]][random[0]].scale.y = 0.1;
        scene.add(grid[random[1]][random[0]]);
 
        return 0;
    }
 
    return 1;

}


/*************************** Move Functions ********************************/

function MoveLeft() {

    var moveCount = 0;
    for (var j = 0; j < 5; j++) {

        for (var i = 1; i < 5; i++) {

            if (grid[j][i].name != "empty") {

                for (var c = 0; c < i; c++) {

                    if (grid[j][c].name == "empty") {
                        Swap([j, i], [j, c]);
                        moveCount++;

                    }
                }
            }
        }
    }
    return moveCount;
}


function MoveRight() {

    var moveCount = 0;
    for (var j = 4; j >= 0; j--) {

        for (var i = 3; i >= 0; i--) {

            if (grid[j][i].name != "empty") {

                for (var c = 4; c > i; c--) {

                    if (grid[j][c].name == "empty") {
                        Swap([j, i], [j, c]);
                        moveCount++;
                    }
                }
            }
        }
    }
    return moveCount;
}

function MoveDown() {

    var moveCount = 0;
    for (var i = 0; i < 5; i++) {

        for (var j = 1; j < 5; j++) {

            if (grid[j][i].name != "empty") {

                for (var c = 0; c < j; c++) {

                    if (grid[c][i].name == "empty") {
                        Swap([j, i], [c, i]);
                        moveCount++;
                    }
                }
            }
        }
    }
    return moveCount;
}

function MoveUp() {

    var moveCount = 0;
    for (var j = 4; j >= 0; j--) {

        for (var i = 4; i >= 0; i--) {

            if (grid[j][i].name != "empty") {

                for (var c = 4; c > j; c--) {

                    if (grid[c][i].name == "empty") {
                        Swap([j, i], [c, i]);
                        moveCount++;
                    }
                }
            }
        }
    }
    return moveCount;
}

/*************************** Merge Functions ********************************/

function HorizontalMerge() {


    //this shouldn't go over 2 because we only get 2 merge per line
    var mergeCount = 0;

    for (var j = 0; j < 5; j++) {

        for (var i = 0; i < 4; i++) {


            if (grid[j][i].name != "empty") {

                for (var z = i + 1; z < 5; z++) {
                    if (grid[j][z].name != "empty") {

                        if (grid[j][i].name == grid[j][z].name) {
                            mergeBlock([j, i], [j, z]);
                            mergeCount++;
                        }
                        break;
                    }
                }
            }
        }
    }
    return mergeCount;
}

function VerticalMerge() {


    //this shouldn't go over 2 because we only get 2 merge per line
    var mergeCount = 0;

    for (var i = 0; i < 5; i++) {

        for (var j = 0; j < 4; j++) {

            if (grid[j][i].name != "empty") {

                for (var z = j + 1; z < 5; z++) {
                    if (grid[z][i].name != "empty") {

                        if (grid[j][i].name == grid[z][i].name) {
                            mergeBlock([j, i], [z, i]);
                            mergeCount++;
                        }
                        break;
                    }
                }
            }
        }
    }
    return mergeCount;
}


function mergeBlock(a, b) {

    //Save last position
    var positionA = grid[a[0]][a[1]].position;
    var positionB = grid[b[0]][b[1]].position;
    //Remove from scene
    scene.remove(grid[a[0]][a[1]]);
    scene.remove(grid[b[0]][b[1]]);

    if (grid[a[0]][a[1]].name == "5") {
        grid[a[0]][a[1]] = Blocks[1].clone();


    } else if (grid[a[0]][a[1]].name == "25") {
        grid[a[0]][a[1]] = Blocks[2].clone();


    } else if (grid[a[0]][a[1]].name == "125") {
        grid[a[0]][a[1]] = Blocks[3].clone();


    } else if (grid[a[0]][a[1]].name == "625") {
        grid[a[0]][a[1]] = Blocks[4].clone();


    } else if (grid[a[0]][a[1]].name == "3125") {
        grid[a[0]][a[1]] = Blocks[5].clone();


    } else if (grid[a[0]][a[1]].name == "15625") {
        grid[a[0]][a[1]] = Blocks[6].clone();


    } else if (grid[a[0]][a[1]].name == "78125") {
        grid[a[0]][a[1]] = Blocks[7].clone();


    } else if (grid[a[0]][a[1]].name == "390625") {
        grid[a[0]][a[1]] = Blocks[8].clone();

    } else if (grid[a[0]][a[1]].name == "1953125") {
        grid[a[0]][a[1]] = Blocks[9].clone();

    } else if (grid[a[0]][a[1]].name == "9765625") {
        grid[a[0]][a[1]] = Blocks[10].clone();


    } else if (grid[a[0]][a[1]].name == "48828125") {
        grid[a[0]][a[1]] = Blocks[11].clone();


    } else if (grid[a[0]][a[1]].name == "244140625") {
        grid[a[0]][a[1]] = Blocks[12].clone();


    }else if (grid[a[0]][a[1]].name == "1220703125") {
        grid[a[0]][a[1]] = Blocks[13].clone();


    }

    grid[b[0]][b[1]] = empty.clone();

    //Scaledown Effect
    grid[a[0]][a[1]].scale.x = 1.2;
    grid[a[0]][a[1]].scale.y = 1.2;
    //Re-assign positions
    grid[a[0]][a[1]].position.add(positionA);
    grid[b[0]][b[1]].position.add(positionB);
    //Add to scene
    scene.add(grid[a[0]][a[1]]);
    


}

function blockcommands(event) {
  
    event = event || window.event;
    
    if (event.keyCode == '37') {}
    else if (event.keyCode == '38') {}
    else if (event.keyCode == '39') {}
    else if (event.keyCode == '40') {}
    else if (event.keyCode == '13 ') {
            //Enter key
            init();
        }
    else if(event.keyCode=='77')
        {
            window.location = "menu.html";
    
        }
   
    }

function failedGame(){
    document.onkeydown = blockcommands;
    document.getElementById("end2").innerHTML = "Well..this is sad";
    }
function UpdateScore() {

    score = 588000000;

    //Calculate current score
    grid.forEach(function (array) {
        array.forEach(function (box) {
            if (box.name != "empty") {
                score -= parseInt(box.name);
            }
        });
    });
    if(score<=0)
    {
        document.onkeydown = blockcommands;
        score=0;
        document.getElementById("end2").innerHTML = "Nice";
        
    }
   
    document.getElementById("scoresJupiter").innerHTML = score + "km left";


}


function UpdateTopScore() {
    document.getElementById("topscoresJupiter").innerHTML = "Best:" + topScore + "km";
}



function Swap(a, b) {

    var tmp = grid[a[0]][a[1]];
    grid[a[0]][a[1]] = grid[b[0]][b[1]];
    grid[b[0]][b[1]] = tmp;

}






