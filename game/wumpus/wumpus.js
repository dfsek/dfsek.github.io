function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function reset() {
	for(var i = 0; i <= 19; i++) {
		changePointColor(i, 0xffffff);
	}
  visitedSpaces = [0];
	faceVertex(0);
	arrows = 5;
	foundHunterArrow = false;
	win = false;
	dead = false;
	wumpusRoom = getRandomInt(1, 19);
	droppedArrowRoom = getRandomInt(1, 19);
	batRoom = [getRandomInt(1, 19), getRandomInt(1, 19)];
	pitRoom = [getRandomInt(1, 19), getRandomInt(1, 19)];
	data = checkRoom(0);
	displayVertex = updatedCurrentVertex + 1;
  document.getElementById("sub").onclick = function(e) {};
  document.getElementById("command").removeAttribute("disabled");
  document.getElementById("sub").setAttribute("value", "Submit");
	document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "<br/>Resetting Game...<br/><br/><br/>";
	document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "You are in Room  " + displayVertex + "." + data.nearStr + " Where will you move? <br/><br/>";
  document.getElementById("commands").scrollTop = document.getElementById("commands").scrollHeight;
  document.getElementById("command").focus();
}


function onGameEnd() {
	document.getElementById("sub").removeAttribute("disabled");
	document.getElementById("sub").setAttribute("value", "Restart");
	document.getElementById("sub").onclick = function(e) {
    e.preventDefault()
    reset();
  }
}


var visitedSpaces = [0];


var arrows = 5;

var foundHunterArrow = false;

var win = false;

var dead = false;

var wumpusRoom = getRandomInt(1, 19);

var droppedArrowRoom = getRandomInt(1, 19);

var batRoom = [getRandomInt(1, 19), getRandomInt(1, 19)];

var pitRoom = [getRandomInt(1, 19), getRandomInt(1, 19)];

function checkRoom(room) {
	var nearStr = "<br/>";
	var returnInfo = {
		"nearStr": null,
		"onBats": false,
		"onPit": false,
		"onWumpus": false,
		"nearBats": false,
		"nearPit": false,
		"nearWumpus": false,
		"foundArrow": false,
		"dead": false
	};
	if(borderingVertices[wumpusRoom].includes(room) === true) {
		nearStr = nearStr + "You smell a Wumpus!<br/>";
		returnInfo.nearWumpus = true;
	}
	if(borderingVertices[batRoom[0]].includes(room) === true || borderingVertices[batRoom[1]].includes(room) === true) {
		nearStr = nearStr + "You hear flapping nearby...<br/>";
		returnInfo.nearBats = true;
	}
	if(borderingVertices[pitRoom[0]].includes(room) === true || borderingVertices[pitRoom[1]].includes(room) === true) {
		nearStr = nearStr + "You feel a breeze nearby...<br/>";
		returnInfo.nearPit = true;
	}
	if(room === wumpusRoom) {
		returnInfo.onWumpus = true;
		returnInfo.dead = true;
	}
	if(batRoom.includes(room) === true) {
		returnInfo.onBats = true;
	}
	if(pitRoom.includes(room) === true) {
		returnInfo.onPit = true;
		returnInfo.dead = true;
	}
	if(returnInfo.onWumpus === false && returnInfo.onPit === false && room === droppedArrowRoom) {
		returnInfo.foundArrow = true;
	}
	returnInfo.nearStr = nearStr;
	if(returnInfo.onWumpus === true) {
		document.getElementById("command").setAttribute("disabled", "true");
		document.getElementById("sub").setAttribute("disabled", "true");
		document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "You Died! The Wumpus devoured you!<br/>";
		dead = true;
    onGameEnd();
	} else if(returnInfo.onBats === true) {
		document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "The bats picked you up!<br/>";
		updatedCurrentVertex = getRandomInt(0, 19);
		while(batRoom.includes(updatedCurrentVertex) === true || updatedCurrentVertex === room) {
			updatedCurrentVertex = getRandomInt(0, 19);
		}
		faceVertex(updatedCurrentVertex);
		if(updatedCurrentVertex === wumpusRoom) {
			document.getElementById("command").setAttribute("disabled", "true");
			document.getElementById("sub").setAttribute("disabled", "true");
			document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "You Died! The bats flew to the Wumpus and it devoured you!<br/>";
			dead = true;
      onGameEnd();
		} else if(pitRoom.includes(updatedCurrentVertex) === true) {
			document.getElementById("command").setAttribute("disabled", "true");
			document.getElementById("sub").setAttribute("disabled", "true");
			document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "You Died! The bats flew to the bottomless pit and you fell in!<br/>";
			dead = true;
      onGameEnd();
		}
	} else if(returnInfo.onPit === true) {
		document.getElementById("command").setAttribute("disabled", "true");
		document.getElementById("sub").setAttribute("disabled", "true");
		document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "You Died! You fell into the bottomless pit!<br/>";
		dead = true;
    onGameEnd();
	}
	return returnInfo;
}




var updatedCurrentVertex = 0;

//console.log("Wumpus: Room " + wumpusRoom + ", bats: Room " + batRoom + ", pit: Room " + pitRoom);

document.getElementById("command").focus();
document.getElementById("commands").onclick = function() {
	document.getElementById("command").focus();
}

function shoot(room) {
	if(arrows !== 0) {
		arrows = arrows - 1;
		if(room === wumpusRoom) {
			document.getElementById("command").setAttribute("disabled", "true");
			document.getElementById("sub").setAttribute("disabled", "true");
			win = true;
      onGameEnd();
			return "You shot the Wumpus! You Win!<br/>";
		} else {
			if(getRandomInt(0, 8) >= 1) {
				wumpusRoom = borderingVertices[wumpusRoom][getRandomInt(0, 2)];
				return "Drats! You Missed! You have " + arrows + " arrows left.<br/>You hear the Wumpus moving!<br/><br/>";
			} else {
				return "Drats! You Missed! You have " + arrows + " arrows left.<br/><br/>";
			}
		}
	} else {
		return "You do not have any arrows!<br/>"
	}
}

	$("#gameInput").submit(function(e) {
		e.preventDefault();
		if(win === false && dead === false) {
			var data = $("#command")[0].value;
			var element = document.getElementById("commands")
			var info;
			var nearStr;
			var arrow = false;
			element.innerHTML = element.innerHTML + "&gt; " + data + "<br/>";

			$("#command")[0].value = "";
			updatedCurrentVertex = currentVertex;
			if(data === "r" || data === "red") {
				document.getElementById("command").setAttribute("disabled", "true");
				document.getElementById("sub").setAttribute("disabled", "true");
				setTimeout(function() {
					if(dead === false) {
						document.getElementById("command").removeAttribute("disabled");
						document.getElementById("sub").removeAttribute("disabled");
						document.getElementById("command").focus();
					}
				}, 750);
				var displayVertex = borderingVertices[currentVertex][0] + 1;
				element.innerHTML = element.innerHTML + "Moving to the nearest red room (room " + displayVertex + ")<br/><br/>";
				updatedCurrentVertex = borderingVertices[currentVertex][0];
				var room = checkRoom(updatedCurrentVertex);
				dead = room.dead;
				arrow = room.foundArrow;
				nearStr = room.nearStr;
				if(room.onBats === false) {
					faceVertex(borderingVertices[currentVertex][0]);
				} else {
					var room = checkRoom(updatedCurrentVertex);
					dead = room.dead;
					arrow = room.foundArrow;
					nearStr = room.nearStr;
				}
			} else if(data === "g" || data === "green") {
				document.getElementById("command").setAttribute("disabled", "true");
				document.getElementById("sub").setAttribute("disabled", "true");
				setTimeout(function() {
					if(dead === false) {
						document.getElementById("command").removeAttribute("disabled");
						document.getElementById("sub").removeAttribute("disabled");
						document.getElementById("command").focus();
					}
				}, 750);
				var displayVertex = borderingVertices[currentVertex][1] + 1;
				element.innerHTML = element.innerHTML + "Moving to the nearest green room (room " + displayVertex + ")<br/><br/>";
				updatedCurrentVertex = borderingVertices[currentVertex][1];
				var room = checkRoom(updatedCurrentVertex);
				dead = room.dead;
				arrow = room.foundArrow;
				nearStr = room.nearStr;
				if(room.onBats === false) {
					faceVertex(borderingVertices[currentVertex][1]);
				} else {
					var room = checkRoom(updatedCurrentVertex);
					dead = room.dead;
					arrow = room.foundArrow;
					nearStr = room.nearStr;
				}
			} else if(data === "b" || data === "blue") {
				document.getElementById("command").setAttribute("disabled", "true");
				document.getElementById("sub").setAttribute("disabled", "true");
				setTimeout(function() {
					if(dead === false) {
						document.getElementById("command").removeAttribute("disabled");
						document.getElementById("sub").removeAttribute("disabled");
						document.getElementById("command").focus();
					}
				}, 750);
				var displayVertex = borderingVertices[currentVertex][2] + 1;
				element.innerHTML = element.innerHTML + "Moving to the nearest blue room (room " + displayVertex + ")<br/><br/>";
				updatedCurrentVertex = borderingVertices[currentVertex][2];
				var room = checkRoom(updatedCurrentVertex);
				dead = room.dead;
				arrow = room.foundArrow;
				nearStr = room.nearStr;
				if(room.onBats === false) {
					faceVertex(borderingVertices[currentVertex][2]);
				} else {
					var room = checkRoom(updatedCurrentVertex);
					dead = room.dead;
					arrow = room.foundArrow;
					nearStr = room.nearStr;
				}
			} else if(data.split('')[0] === "shoot" || data.split('')[0] === "s") {
				var shotData = data.substr(data.indexOf(' ') + 1);
				if(shotData === "r" || shotData === "red") {
					element.innerHTML = element.innerHTML + shoot(borderingVertices[currentVertex][0]);
					var room = checkRoom(updatedCurrentVertex);
					dead = room.dead;
					arrow = room.foundArrow;
					nearStr = room.nearStr;
				} else if(shotData === "g" || shotData === "green") {
					element.innerHTML = element.innerHTML + shoot(borderingVertices[currentVertex][1]);
					var room = checkRoom(updatedCurrentVertex);
					dead = room.dead;
					arrow = room.foundArrow;
					nearStr = room.nearStr;
				} else if(shotData === "b" || shotData === "blue") {
					element.innerHTML = element.innerHTML + shoot(borderingVertices[currentVertex][2]);
					var room = checkRoom(updatedCurrentVertex);
					dead = room.dead;
					arrow = room.foundArrow;
					nearStr = room.nearStr;
				} else {
					element.innerHTML = element.innerHTML + "<span style='color:red;'>ERROR:</span> \"" + shotData + "\" is not a valid target.<br/><br/>";
					var room = checkRoom(updatedCurrentVertex);
					dead = room.dead;
					arrow = room.foundArrow;
					nearStr = room.nearStr;
				}
			} else if(data === "arrows" || data === "arrow" || data === "a") {
				var room = checkRoom(updatedCurrentVertex);
				dead = room.dead;
				arrow = room.foundArrow;
				nearStr = room.nearStr;
				element.innerHTML = element.innerHTML + "You have  " + arrows + " Arrows left.<br/>";
			} else {
				var room = checkRoom(updatedCurrentVertex);
				dead = room.dead;
				arrow = room.foundArrow;
				nearStr = room.nearStr;
				element.innerHTML = element.innerHTML + "<span style='color:red;'>ERROR:</span> command \"" + data + "\" does not exist.<br/><br/>";
			}
			if(dead === false && win === false) {
				if(arrow === true && foundHunterArrow === false) {
					foundHunterArrow = true;
					arrows = arrows + 1;
					element.innerHTML = element.innerHTML + "You found an arrow dropped by a previous hunter!<br/>";
				}
				var displayVertex = updatedCurrentVertex + 1;
				element.innerHTML = element.innerHTML + "You are in Room  " + displayVertex + "." + nearStr + " Where will you move? <br/><br/>";
			}
			element.scrollTop = element.scrollHeight;
		}
	})



var borderingVertices = [
	[1, 2, 17],
	[0, 3, 5],
	[0, 4, 16],
	[1, 4, 7],
	[2, 3, 13],
	[1, 6, 19],
	[5, 7, 8],
	[3, 6, 10],
	[6, 9, 18],
	[8, 10, 11],
	[7, 9, 13],
	[9, 12, 14],
	[11, 13, 16],
	[4, 10, 12],
	[11, 15, 18],
	[14, 16, 17],
	[2, 12, 15],
	[0, 15, 19],
	[8, 14, 19],
	[5, 17, 18]
]

function changePointColor(point, hexColor) {
	points[point].material.color.setHex(hexColor);
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
camera.position.set(-5.62238746780696, 17.30392934928994, 47.63363085296594);
var renderer = new THREE.WebGLRenderer({
	antialias: true
});
renderer.setSize(400, 400);
document.getElementById("openGL").appendChild(renderer.domElement);

var objGeom = new THREE.DodecahedronGeometry(10, 0);
var obj = new THREE.Mesh(objGeom, new THREE.MeshBasicMaterial({
	color: "green",
	wireframe: true
}));
obj.rotation.z = Math.PI / 10;
obj.position.set(0, 0, 0);

var light = new THREE.PointLight(0xbbbbbb, 1, 0);

light.position.set(0, 200, 0);

scene.add(light);

var geometry = new THREE.DodecahedronGeometry(16, 0);
var material = new THREE.MeshPhongMaterial({
	color: 0x156289,
	emissive: 0x072534,
	side: THREE.DoubleSide,
	flatShading: true
});
var dodecahedron = new THREE.Mesh(geometry, material);
var group = new THREE.Group();

group.add(dodecahedron);

var edges = new THREE.EdgesGeometry(geometry);
var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
	color: 0xffff00,
	linewidth: 3
}));
group.add(line);
var pointMaterial = new THREE.PointsMaterial({
	color: 0xff0000
});




var vertices = [];
var points = [];
var segments = [];
var vectors = [];

for(var i = 0; i < dodecahedron.geometry.vertices.length; i++) {
	var vertex = dodecahedron.geometry.vertices[i]
	vertices[i] = new THREE.Geometry();
	vertices[i].vertices.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z));
	var dotMaterial = new THREE.PointsMaterial({
		size: 10,
		sizeAttenuation: false
	});
	points.push(new THREE.Points(vertices[i], dotMaterial));
	var segmentMaterial = new THREE.LineBasicMaterial({
		color: 0xffffff,
		linewidth: 3
	});
	var segment = new THREE.Geometry();
	vectors.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z));
	segment.vertices.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z));
	segment.vertices.push(new THREE.Vector3(0, 0, 0));
	segments.push(new THREE.LineSegments(segment, segmentMaterial));
	group.add(segments[i]);
	group.add(points[i]);
}
group.rotation.z = Math.PI / 10;
group.position.set(0, 0, 0);
scene.add(group);
var prevFog = false;
var currentVertex = null;

function faceVertex(i) {
	if(visitedSpaces.includes(i) === false) {
		visitedSpaces.push(i);
	}
	group.rotation.x = 0;
	group.rotation.y = 0;
	group.rotation.z = Math.PI / 10;
	if(currentVertex !== i) {
		var cameraPosition = new THREE.Vector3().copy(camera.getWorldPosition());
		var radius = cameraPosition.distanceTo(obj.getWorldPosition());
		var targetPosition = new THREE.Vector3().copy(obj.geometry.vertices[i]).applyMatrix4(obj.matrix);
		targetPosition.sub(obj.position).normalize().multiplyScalar(radius).add(obj.position);
		tweenCamera(cameraPosition, targetPosition, obj.getWorldPosition());
	}

	setTimeout(function() {
		for(var k = 0; k <= 19; k++) {
			changePointColor(k, 0xffffff);
		}
		for(var j = 0; j < visitedSpaces.length; j++) {
			changePointColor(visitedSpaces[j], 0x888888);
		}
		if(currentVertex !== null) {
			changePointColor(currentVertex, 0x888888);
			if(visitedSpaces.includes(borderingVertices[currentVertex][0]) === true) {
				changePointColor(borderingVertices[currentVertex][0], 0x888888);
			} else {
				changePointColor(borderingVertices[currentVertex][0], 0xffffff);
			}

			if(visitedSpaces.includes(borderingVertices[currentVertex][1]) === true) {
				changePointColor(borderingVertices[currentVertex][1], 0x888888);
			} else {
				changePointColor(borderingVertices[currentVertex][1], 0xffffff);
			}

			if(visitedSpaces.includes(borderingVertices[currentVertex][2]) === true) {
				changePointColor(borderingVertices[currentVertex][2], 0x888888);
			} else {
				changePointColor(borderingVertices[currentVertex][2], 0xffffff);
			}
		}
		currentVertex = i;
		changePointColor(i, 0x00ffff);
		if(visitedSpaces.includes(borderingVertices[currentVertex][0]) === true) {
			changePointColor(borderingVertices[currentVertex][0], 0x880000);
		} else {
			changePointColor(borderingVertices[currentVertex][0], 0xff0000);
		}

		if(visitedSpaces.includes(borderingVertices[currentVertex][1]) === true) {
			changePointColor(borderingVertices[currentVertex][1], 0x008800);
		} else {
			changePointColor(borderingVertices[currentVertex][1], 0x00ff00);
		}

		if(visitedSpaces.includes(borderingVertices[currentVertex][2]) === true) {
			changePointColor(borderingVertices[currentVertex][2], 0x000088);
		} else {
			changePointColor(borderingVertices[currentVertex][2], 0x0000ff);
		}
	}, 750);
}



function tweenCamera(position, target, center) {
	var tween = new TWEEN.Tween(camera.position)
		.to({
			x: target.x,
			y: target.y,
			z: target.z
		}, 750)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function() {
			camera.lookAt(center);
			if(camera.rotation.z > Math.PI / 2) {
				camera.rotation.z = camera.rotation.z - 0.01;
			} else if(camera.rotation.z < Math.PI / 2) {
				camera.rotation.z = camera.rotation.z + 0.01;
			}
		})
		.start();
	var tween2 = new TWEEN.Tween(light.position)
		.to({
			x: target.x,
			y: target.y,
			z: target.z
		}, 750)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function() {

		})
		.start();
}

light.position.x = camera.position.x;
light.position.y = camera.position.y;
light.position.z = camera.position.z;

render();

function render() {
	TWEEN.update();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}


var controls = new THREE.OrbitControls(camera);
controls.dampingFactor = 1;
controls.enablePan = false;
controls.enableDamping = true;
controls.enableZoom = false;


faceVertex(0);


var data = checkRoom(0);
var displayVertex = updatedCurrentVertex + 1;
document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "You are in Room  " + displayVertex + "." + data.nearStr + " Where will you move? <br/><br/>";
