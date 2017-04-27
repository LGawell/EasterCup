$(function () {
	
	var contArray = new Array();
	var winners = new Array();
	var contestants = $(".contestant");
	
	$("#start_btn").on("click", getContestants);
	$("#fight_btn").on("click", fight);
	
	function getContestants () {
		
		for (var i = 0; i < contestants.length; i++) {
			
			contArray.push(contestants[i].value);
		}
		
		shuffleArray(contArray);
		
		$("#contestants").hide();
		
		addFighters(contArray[0], contArray[1]);
	}
	
	function shuffleArray (array) {
		
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		
		return array;
	}
	
	function addFighters (a, b) {
		
		$("#arena").append("<br/><br/><br/>");
		$("#arena").append(a + "<br/><br/>");
		$("#arena").append(b + "<br/><br/>");
	}
	
	function fight (a, b) {
		
		alert(Math.random() * 10);
		
		if (Math.random() * 10 <= 5) {
			
			winners.push(a);
		}
		else {
			
			winners.push(b);
		}
	}
	
	function nextFight () {
		
		
	}
	
	
	
	
	
	
	
	
	
	
});