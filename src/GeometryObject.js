define([
    'three',
    './GLTFLoader'
], function (
    THREE,
    GLTFLoader
) {
    function GeometryObject(html) {
        this.RenderDone = 0;
        this.RenderId = 0;
        this.loader = new GLTFLoader.GLTFLoader();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
        this.camera.position.z = 2;

        this.lights = [];
        this.lights[ 0 ] = new THREE.PointLight(0xffffff, 1, 0);
        this.lights[ 1 ] = new THREE.PointLight(0xffffff, 1, 0);
        this.lights[ 2 ] = new THREE.PointLight(0xffffff, 1, 0);

        this.lights[ 0 ].position.set(0, 200, 0);
        this.lights[ 1 ].position.set(100, 200, 100);
        this.lights[ 2 ].position.set(-100, -200, -100);

        this.scene.add(this.lights[ 0 ]);
        this.scene.add(this.lights[ 1 ]);
        this.scene.add(this.lights[ 2 ]);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(500, 500);
        this.renderer.setClearColor(0x000000, 1);
        html.appendChild(this.renderer.domElement);
    }

    GeometryObject.prototype.object = function () {
        this.loader.load('rocket.gltf', (gltf) => {
            this.scene.add(gltf.scene);
            this.renderer.render(this.scene, this.camera);
        } );
    }

   GeometryObject.prototype.TryRender = function () {
        this.RenderDone += 1;
        if (this.RenderDone == 3) {
            this.RenderDone = 0;
            console.log("Render id:"+this.RenderId);
            this.renderer.render(this.scene, this.camera);
            this.RenderId += 1;
        }
    }

    GeometryObject.prototype.updateX = function (x) {
        if (this.scene.rotation.x != x) {
            this.scene.rotation.x = x;
            console.log("updateX:"+x);
            this.TryRender();
        }
    }

    GeometryObject.prototype.updateY = function (y) {
        if (this.scene.rotation.y != y) {
            this.scene.rotation.y = y;
            console.log("updateY:"+y);
            this.TryRender();
        }
    }

    GeometryObject.prototype.updateZ = function (z) {
        if (this.scene.rotation.z != z) {
            this.scene.rotation.z = z;
            console.log("updateZ:"+z);
            this.TryRender();
        }
    }

    return GeometryObject;
})
