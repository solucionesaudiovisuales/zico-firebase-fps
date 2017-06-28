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

		// fbx_loader.load( './assets/ELEPHANT.FBX', function( object ) {

		// 	object.mixer = new THREE.AnimationMixer( object );
		// 	mixers.push( object.mixer );

		// 	// var action = object.mixer.clipAction( object.animations[ 0 ] );
		// 	// action.play();

		// 	scene.add( object );

		// });


		///////

		loader.load('./assets/elephant.json', function (geometry, materials) {

			materials.forEach(function (material) {
			  material.skinning = true;
			});

			// geometry.center();
			// geometry.rotateY(180);

			scope.character = new THREE.SkinnedMesh(
				geometry,
				// new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, shininess: 0 } )
				new THREE.MeshFaceMaterial(materials)
			);

			console.log(geometry.animations[ 0 ]);

			scope.character.mixer = new THREE.AnimationMixer(scope.character);

			mixers.push( scope.character.mixer );

			// scope.action.hello = scope.character.mixer.clipAction(geometry.animations[ 0 ]);
			// scope.action.idle = scope.character.mixer.clipAction(geometry.animations[ 1 ]);
			// scope.action.run = scope.character.mixer.clipAction(geometry.animations[ 3 ]);
			// scope.action.walk = scope.character.mixer.clipAction(geometry.animations[ 4 ]);

			// scope.action.hello.setEffectiveWeight(1);
			// scope.action.idle.setEffectiveWeight(1);
			// scope.action.run.setEffectiveWeight(1);
			// scope.action.walk.setEffectiveWeight(1);

			// scope.action.hello.setLoop(THREE.LoopOnce, 0);
			// scope.action.hello.clampWhenFinished = true;

			// scope.action.hello.enabled = true;
			// scope.action.idle.enabled = true;
			// scope.action.run.enabled = true;
			// scope.action.walk.enabled = true;

			scope.action.hello = scope.character.mixer.clipAction( geometry.animations[ 0 ] );
			scope.action.hello.setEffectiveWeight(1);
			scope.action.hello.enabled = true;

			scene.add(scope.character);

			scope.action.hello.isLoaded = true;
			scope.action.hello.play();
			scope.animate();

			console.log(scope.action.hello);


			// scope.isLoaded = true;
			// scope.action.walk.play();

			// scope.animate();

			// //////////////
			// var pivot = new THREE.Group();
			// scene.add( pivot );

			// pivot.add( scope.character );
			// pivot.rotation.y=5;
			//pivot.position.set( 4, - 3, - 5 ); // the negative of the group's center

			if ( scope.isMainPlayer ) {
				// Give player control of this mesh
				controls = new THREE.PlayerControls( camera , scope.character );
				controls.init();
			}
		});

		////////////

	};

	this.setOrientation = function( position, rotation ) {
		if ( scope.character ) {
			scope.character.position.copy( position );
			scope.character.rotation.x = rotation.x;
			scope.character.rotation.y = rotation.y;
			scope.character.rotation.z = rotation.z;
		}
	};

	this.animate = function() {
		requestAnimationFrame( scope.animate );

		if ( mixers.length > 0 ) {
			for ( var i = 0; i < mixers.length; i ++ ) {
				mixers[ i ].update( clock.getDelta() );
			}
		}
		// var delta = clock.getDelta();
		// scope.character.mixer.update(delta);
	}
}