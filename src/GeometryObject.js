define([
    'three',
    './GLTFLoader'
], function (
    THREE,
    GLTFLoader
) {
    function GeometryObject(html) {
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

    GeometryObject.prototype.updateX = function (x) {
        this.scene.rotation.x = x;
        this.renderer.render(this.scene, this.camera);
    }

    GeometryObject.prototype.updateY = function (y) {
        this.scene.rotation.y = y;
        this.renderer.render(this.scene, this.camera);
    }

    GeometryObject.prototype.updateZ = function (z) {
        this.scene.rotation.z = z;
        this.renderer.render(this.scene, this.camera);
    }

    return GeometryObject;
})
