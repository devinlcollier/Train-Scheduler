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
	//get the trains from firebase add them to the page
}, function(errorObject)
{
	console.log("The read failed: " + errorObject.code);
});