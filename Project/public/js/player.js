var Player = function( playerID ) {
	this.playerID = playerID;
	this.isMainPlayer = false;
	this.mesh;
	this.character;

	/////////

	this.isLoaded = false;
	this.action = {};
	this.activeActionName = 'idle';

	this.arrAnimations = [
	  'idle',
	  'walk',
	  'run',
	  'hello'
	];
	this.actualAnimation = 0;

	///////

	// var cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
	// var cube_material = new THREE.MeshBasicMaterial( {color: 0x7777ff, wireframe: false} );

	var scope = this;

	this.init = function() {
		// scope.mesh = new THREE.Mesh( cube_geometry, cube_material );
		// scene.add( scope.mesh );

		///////

		loader.load('./models/eva-animated.json', function (geometry, materials) {

			materials.forEach(function (material) {
			  material.skinning = true;
			});

			// geometry.center();
			geometry.rotateY(180);

			scope.character = new THREE.SkinnedMesh(
			  geometry,
			  new THREE.MeshFaceMaterial(materials)
			);

			scope.mixer = new THREE.AnimationMixer(scope.character);

			scope.action.hello = scope.mixer.clipAction(geometry.animations[ 0 ]);
			scope.action.idle = scope.mixer.clipAction(geometry.animations[ 1 ]);
			scope.action.run = scope.mixer.clipAction(geometry.animations[ 3 ]);
			scope.action.walk = scope.mixer.clipAction(geometry.animations[ 4 ]);

			scope.action.hello.setEffectiveWeight(1);
			scope.action.idle.setEffectiveWeight(1);
			scope.action.run.setEffectiveWeight(1);
			scope.action.walk.setEffectiveWeight(1);

			scope.action.hello.setLoop(THREE.LoopOnce, 0);
			scope.action.hello.clampWhenFinished = true;

			scope.action.hello.enabled = true;
			scope.action.idle.enabled = true;
			scope.action.run.enabled = true;
			scope.action.walk.enabled = true;

			scene.add(scope.character);

			scope.isLoaded = true;
			scope.action.walk.play();

			scope.animate();

			if ( scope.isMainPlayer ) {
				// Give player control of this mesh
				controls = new THREE.PlayerControls( camera , scope.character );
				controls.init();
			}
		});

		////////////

	};

	this.setOrientation = function( position, rotation ) {
		// if ( scope.mesh ) {
		// 	scope.mesh.position.copy( position );
		// 	scope.mesh.rotation.x = rotation.x;
		// 	scope.mesh.rotation.y = rotation.y;
		// 	scope.mesh.rotation.z = rotation.z;
		// }
		if ( scope.character ) {
			scope.character.position.copy( position );
			scope.character.rotation.x = rotation.x;
			scope.character.rotation.y = -rotation.y;
			scope.character.rotation.z = rotation.z;
		}
	};

	this.animate = function() {
		requestAnimationFrame( scope.animate );
		var delta = clock.getDelta();
		scope.mixer.update(delta);
	}
}