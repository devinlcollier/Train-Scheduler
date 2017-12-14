var config = {
    apiKey: "AIzaSyBkgb-eRAPS7voRmh9PBUOMKhECeAkdtPQ",
    authDomain: "firstproject-9e6f4.firebaseapp.com",
    databaseURL: "https://firstproject-9e6f4.firebaseio.com",
    projectId: "firstproject-9e6f4",
    storageBucket: "firstproject-9e6f4.appspot.com",
    messagingSenderId: "289921388882"
};

firebase.initializeApp(config);
var database = firebase.database();

database.ref("trains").on("value", function(snapshot)
{
	console.log(snapshot.val());
	console.log(snapshot.val().name);
	var train = $("<tr>");
	train.append($("<td>").text(snapshot.val().name));
	train.append($("<td>").text(snapshot.val().destination));
	train.append($("<td>").text(snapshot.val().frequency));
	//append next arrival
	//append minutes away
	$("tbody").append(train);
}, function(errorObject)
{
	console.log("The read failed: " + errorObject.code);
});

$("button").on("click", function(){
	event.preventDefault();
	database.ref("trains").push({
		name: $("#train-name").val(),
		destination: $("#destination").val(),
		firstTrainTime: $("#first-train-time").val(),
		frequency: $("#frequency").val()
	});
});