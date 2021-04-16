
    var scene, camera, renderer;
    var geometry, material;
    var wireGeometry, wireMaterial;
    var grid;
    var initiater = 0;
    var score=0;
    var topScore = 2;
    var FullBoxSize;
     //var debug = false;

    var mat;


    var Blocks;
    var empty;



    window.onresize = WindowResize;

    init();
    animate();

    function init() {


        FullBoxSize = new THREE.Vector3(1, 1, 0.01);
        score = 2;
        //Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 5;
        camera.position.x = 1.5;
        camera.position.y = 1.5;

        // Color
        var col = new THREE.Color(247,247,247);

        //Geometry
        geometry = new THREE.BoxGeometry(0.9, 0.9, 0.01);
       

        //Text Textures
        var dynamicTexture = [];
        for (var i = 0; i < 13; i++) {

            dynamicTexture[i] = new THREEx.DynamicTexture(128, 128);
            dynamicTexture[i].clear('white');


            if ((Math.pow(3, i) > 0) && (Math.pow(3, i) < 10)) {
                //1 digit text
                dynamicTexture[i].context.font = "120px monospace";
                dynamicTexture[i].drawText(Math.pow(3, i), 30, 100, 'black');
            } else if ((Math.pow(3, i) > 10) && (Math.pow(3, i) < 100)) {
                //2 digit text
                dynamicTexture[i].context.font = "100px monospace";
                dynamicTexture[i].drawText(Math.pow(3, i), 8, 96, 'black');
            } else if ((Math.pow(3, i) > 100) && (Math.pow(3, i) < 1000)) {
                //3 digit text
                dynamicTexture[i].context.font = "70px monospace";
                dynamicTexture[i].drawText(Math.pow(3, i), 8, 86, 'black');
            } else if (Math.pow(3, i) > 1000 && (Math.pow(3, i) < 10000)) {
                //4 digit text
                dynamicTexture[i].context.font = "70px monospace";
                dynamicTexture[i].drawText(Math.pow(3, i), 8, 86, 'black');
            } else if (Math.pow(3, i) > 10000 && (Math.pow(3, i) < 100000)) {
               //5 digit text
               dynamicTexture[i].context.font = "50px monospace";
               dynamicTexture[i].drawText(Math.pow(3, i), 8, 84, 'black');
            }else if (Math.pow(3, i) > 100000 ) {
               //6 digit text
               dynamicTexture[i].context.font = "40px monospace";
               dynamicTexture[i].drawText(Math.pow(3, i), 8, 82, 'black');
            }
            else {
                
                dynamicTexture[i].context.font = "30px monospace";
                dynamicTexture[i].drawText(Math.pow(3, i), 8, 80, 'red');
            } 
           
            console.log(Math.pow(3, i));
            dynamicTexture[i].texture.needsUpdate = true;
        }


        //Block Materials
        mat = new Array(12);

        mat[0] = new THREE.MeshBasicMaterial({
            color: 0xCCEEFF,
            map: dynamicTexture[1].texture
        });
        mat[1] = new THREE.MeshBasicMaterial({
            color: 0x99DDFF,
            map: dynamicTexture[2].texture
        });
        mat[2] = new THREE.MeshBasicMaterial({
            color: 0x4DC3FF,
            map: dynamicTexture[3].texture
        });
        mat[3] = new THREE.MeshBasicMaterial({
            color: 0x00CCFF,
            map: dynamicTexture[4].texture
        });
        mat[4] = new THREE.MeshBasicMaterial({
            color: 0x0099FF,
            map: dynamicTexture[5].texture
        });
        mat[5] = new THREE.MeshBasicMaterial({
            color: 0x6666FF,
            map: dynamicTexture[6].texture
        });
        mat[6] = new THREE.MeshBasicMaterial({
            color: 0xCC33FF,
            map: dynamicTexture[7].texture
        });
        mat[7] = new THREE.MeshBasicMaterial({
            color: 0xCC0099,
            map: dynamicTexture[8].texture
        });
        mat[8] = new THREE.MeshBasicMaterial({
            color: 0xFFFF66,
            map: dynamicTexture[9].texture
        });
        mat[9] = new THREE.MeshBasicMaterial({
            color: 0xFF9966,
            map: dynamicTexture[10].texture
        });
        mat[10] = new THREE.MeshBasicMaterial({
            color: 0x990000,
            map: dynamicTexture[11].texture
        });
        mat[11] = new THREE.MeshBasicMaterial({
            color: 0x800000,
            map: dynamicTexture[12].texture
        });



        Blocks = new Array(12);

        for (var i = 0; i < 13; i++) {

            Blocks[i] = new THREE.Mesh(geometry, mat[i]);
            Blocks[i].name = Math.pow(3, i + 1) + "";
        }




        //Empty blocks
        wireGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.01);
        wireMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        });

        empty = new THREE.Mesh(wireGeometry, wireMaterial);
        empty.name = "empty";

        //4x4 array with blocks
        grid = new Array(4);
        for (var j = 0; j < 4; j++) {
            grid[j] = new Array(4);
            for (var i = 0; i < 4; i++) {

                grid[j][i] = empty.clone();
             
            }
        }


        //Backplanes
        var BackGeometry = new THREE.BoxGeometry(0.89, 0.89, 0.01);
        var BackColor = new THREE.Color(0xffffff);
        var BackJom=new THREE.BoxGeometry(4.2,4.2,0.01);
        var BackCol = new THREE.Color(0x8D8D8D);
        var BackMat = new THREE.MeshBasicMaterial({
                    color:BackCol
                });
        var sq=new THREE.Mesh(BackJom,BackMat);
        sq.position.x = 1.5;
                sq.position.y = 1.5;
                sq.position.z = -0.01;
        scene.add(sq);

        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 4; i++) {

                var BackMaterial = new THREE.MeshBasicMaterial({
                    color: BackColor
                });
                var Backplane = new THREE.Mesh(BackGeometry, BackMaterial);

                Backplane.position.x = i;
                Backplane.position.y = j;
                Backplane.position.z = -0.01;
                scene.add(Backplane);
            }
        }


        //Run only once
        if (initiater == 0) {
            renderer = new THREE.WebGLRenderer({
                alpha: 1
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            initiater = 1;
        }

        

        //Add initial block and update score board
        AddRandom();
      
        
    }

     //animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

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

        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 4; i++) {

                if (grid[j][i].name == "empty") {

                    location.push([i, j]);
                }
            }
        }

        if (location.length > 0) {

            var random = location[Math.floor(Math.random() * location.length)];
            scene.remove(grid[random[1]][random[0]]);

            //grid[random[1]][random[0]] = new THREE.Mesh(geometry, material2048[0]);
            //grid[random[1]][random[0]].name = "2";

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



   
    

