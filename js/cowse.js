function initialise() {
	var mapOptions = {
		zoom: 16,
		center: new google.maps.LatLng(54.779384,-1.561288),
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		backgroundColor: 'rgb(80,90,70)'
	}
	//google.maps.visualRefresh = true;
	//var map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
	
	
	//Set up the detail view
	var li = document.querySelectorAll('li'),
		i = 0,
		l = li.length;
	for(i;i<l;i++) {
		li[i].addEventListener('click', showDetail, false);
	}
	
	//Get current position, display distance
	if('geolocation' in navigator) {
		navigator.geolocation.watchPosition(gotPosition, err);
	} else {
		displayLocation('Use Chrome so this page works properly dammit...');
	}
}

function showDetail(e) {
	if(!!activeItem) {
		activeItem.className = '';
	}	
	activeItem = e.target;
	activeItem.className = 'active';
	$('detail').innerHTML = detail[e.target.innerHTML];
	$('detail').className = 'open';
}

function displayLocation(str) {
	$('distance').innerHTML = str;
	$('distance').className = 'open';
}

detail = {
	Newson: 'The mega cow of the group. Master of dance and quick to snatch up a good bargain.',
	Moore: 'Theologian and well respected laureate. Can often be found in neighbouring Jaymoria.',
	Tattersley: 'Currently employed by many tech companies. Can code anything for a reasonable price.',
	Milne: 'Never far from his beloved Asha. Will most likely be found mid song with a comb in his \'fro.',
	Rudd: 'The mysterious party animal, not much is known about the castled one except that he enjoys a stiff drink.'
}

function gotPosition(geoposition) {
	var distance = getDistance(geoposition.coords);
	console.log(distance);
	
	var str = (distance<0.1)?'Cowse welcomes you!':((distance<5)?'You are '+(distance*1000).toFixed()+'m from Cowse':'You are '+distance.toFixed()+'km from Cowse');
	console.log(str);
	
	displayLocation(str);
}

function err(err) {
	displayLocation(err.message);
	console.log(err);
}

function getDistance(currentCoords) {
	var cowseCoords = { //Coords of 7 The Sidings
		latitude:  54.779384,
		longitude: -1.561288
	}
	var R = 6371; // radius of the earth in m
	var dLat = toRad(currentCoords.latitude-cowseCoords.latitude)
	var dLon = toRad(currentCoords.longitude-cowseCoords.longitude);
	var lat1 = toRad(cowseCoords.latitude);
	var lat2 = toRad(currentCoords.latitude);
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	return (R * c);
}

function toRad(deg) {
	return Math.PI*(deg/180);
}

function $(id) {
	return document.getElementById(id);
}

function is_touch_device() {
  return !!('ontouchstart' in window) // works on most browsers 
      || !!('onmsgesturechange' in window); // works on ie10
};

window.onload = initialise;
activeItem = '';