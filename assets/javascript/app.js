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

database.ref("trains").on("child_added", function(snapshot)
{
	console.log(Object.keys(snapshot.val()));
	console.log(snapshot.val());

	var train = $("<tr>");
	train.append($("<td>").text(snapshot.val().name));
	train.append($("<td>").text(snapshot.val().destination));
	train.append($("<td>").text(snapshot.val().frequency));

	var frequency = parseInt(snapshot.val().frequency);
	var firstTime = moment(parseInt(snapshot.val().firstTrainTime), "HH:MM").subtract(1, "years");

	var currentTime = moment();
	var diff = moment().diff(firstTime, "minutes");
	var remainder = diff % frequency;
	var minutesUntilTrain = frequency - remainder;
	var nextTrain = moment().add(minutesUntilTrain, "minutes");

	train.append($("<td>").text(moment(nextTrain).format("hh:mm")));
	train.append($("<td>").text(minutesUntilTrain));
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