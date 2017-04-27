// A basic tournament bracket web app
// By Love Gawell, 2017

// Set some global variables
var contestants = [];
var winners = [];
var qual_id = 0;

// On DOM ready...
$(function () {
	
	// Add event listeners
	$("#addFields").on("click", addFields);
	$("#submitFields").on("click", submitFields);
	$("#submitWinners").on("click", submitWinners);
	
	// Hide winner submission button
	$("#submitWinners").hide();
});

// Add more input fields for contestants on request
function addFields () {
	
	$("#contestantsForm").append('<input type="text" /><br/><input type="text" /><br/>');
}

// Submit, format and append contestant input data
function submitFields () {
	
	// Gather up the input field elements
	var tempContestants = $("input[type|='text']");
	// Declare a string variable to hold the formatted data
	var newQual = "";
	
	// Set bracket id and append a div to display the bracket data in
	qual_id += 1;
	$("#bracketField").append('<div class="qualField" id="qual_' + qual_id +'"></div>');
	
	// Build up the contestant array with the input fields that has a value assigned
	for (var i = 0; i < tempContestants.length; i++) {
		
		if (tempContestants[i].value) {
			
			contestants.push(tempContestants[i].value);
		}
	}
	
	// If there's too few contestants, or none at all, to have a proper competition
	// Alert the user, reset values and cancel operations
	if (contestants.length <= 1) {
		alert("Please enter at least 2 contestants");
		contestants = [];
		qual_id = 0;
		return null;
	}
	
	// Shuffle the contestant array
	contestants = shuffle(contestants);
	
	// Format contestant data
	for (var i = 0; i < contestants.length; i++) {
		
		// Determine if it's the first contestant of a pair, or not
		// And then apply the proper formatting for it
		if (i % 2 === 0) {
			
			newQual += '<div class="vsPair"><p>' + contestants[i] + '<input type="checkbox" /></p>';
		}
		else {
			
			newQual += '<p>' + contestants[i] + '<input type="checkbox" /></p></div>';
		}
	}
	// Append the formatted data to the bracket, and display the appropriate buttons
	$('#qual_' + qual_id).append(newQual);
	$("#submitWinners").show();
	$("#formContainer").hide();
}

// Submit, format and append winner input data
function submitWinners () {
	
	// Reset winners beyond the initial call, and set the new contestants for the new bracket
	if (winners[0] != null) {
		contestants = winners.slice(0);
		winners = [];
	}
	
	// Gather up checkbox data
	var tempWinners = $("input[type|='checkbox']");
	
	// Build up the winners array with those contestants who correspond to the checked boxes
	for (var i = 0; i < tempWinners.length; i++) {
		
		if (tempWinners[i].checked === true) {
			
			winners.push(contestants[i]);
		}
	}
	
	// Get rid of the old boxes
	$("input[type|='checkbox']").remove();
	
	var newQual = "";
	
	// Set bracket id and append a div to display the bracket data in
	qual_id += 1;
	$("#bracketField").append('<div class="qualField" id="qual_' + qual_id +'"></div>');
	
	// If there's only one victor, apply some special formatting to congratulate them!
	if (winners.length === 1) {
		
		newQual += '<h1 class="winner">CONGRATULATIONS</h1>';
		newQual += '<div class="vsPair"><p>' + winners[0] + '</p></div>'
		newQual += '<h1 class="winner">' + winners[0].toUpperCase() + '!</h1>';
		
		var losers = "";
		
		// Check for the unfortunate loser(s) of the final battle	
		for (var i = 0; i < contestants.length; i++) {
			
			if (winners[0] != contestants[i]) {
				
				losers += ", " + contestants[i];
			}
		}
		
		// Give your heartfelt condolences
		newQual += '<h1 class="loser">TOO BAD FOR YOU' + losers.toUpperCase() + '.</h1>';
		
		// Append the formatted data to the bracket, and display the appropriate buttons
		$('#qual_' + qual_id).append(newQual);
		$("#submitWinners").hide();
	}
	// If not, format winner data in a plain manner
	else {
		
		for (var i = 0; i < winners.length; i++) {

			// Determine if it's the first contestant of a pair, or not
			// And then apply the proper formatting for it
			if (i % 2 === 0) {
				
				newQual += '<div class="vsPair"><p>' + winners[i] + '<input type="checkbox" /></p>'
			}
			else {
				
				newQual += '<p>' + winners[i] + '<input type="checkbox" /></p></div>'
			}
		}
		// Append the formatted data to the bracket
		$('#qual_' + qual_id).append(newQual);
	}
}

// Do the Knuth shuffle!
function shuffle (array) {

	//Make an array to hold the values that are needed
	// The argument array's length, and two empty keys to temporarily store a value during swapping, and a randomly selected key to swap with
	var currentIndex = array.length, temporaryValue, randomIndex;

	// For each of the argument array's entries...
	while (0 !== currentIndex) {

		// Randomly get a key in the proper range
		randomIndex = Math.floor(Math.random() * currentIndex);
		// Lower the currentIndex so the while loop will work properly
		currentIndex -= 1;
		// Temporarily store the current value of the argument array
		temporaryValue = array[currentIndex];
		// And assign the current key's value, to the randomly picked key's value
		array[currentIndex] = array[randomIndex];
		// And that key's value, to the temporarily stored value
		array[randomIndex] = temporaryValue;
		// Effectively swapping the values between the two keys
	}
	//After shuffling through the entire argument array, we return it
	return array;
}