var sampleData = {
	"lab_name": "Data Structure",
	"exp_name": "Array",
	"user_id": "user123",
	"data": "11",
	"questions":
		[
			{
			"name": "How this lab helped you understanding the concept?",
			"type": "radioButton",
			"options": ["fine", "good", "well", "not well"]
			},

			{
			"name": "In which course you have this concept?",
			"type": "checkBox",
			"options": ["B.tech", "M.Sc", "UG", "PG"]
			},

			{
			"name": "Any Comments?",
			"type": "textBox",
			}
		]
}

var labelQues;
function renderQuesLabel() {
	labelQues = document.createElement('label')
	labelQues.className = "row col-md-12";
	$("#questions_list").append(labelQues);
}

function renderFeedbackform() {
	$("#lab_name_label").html("Lab Name");
	$("#lab_name_value").html(sampleData.lab_name);
	$("#exp_name_label").html("Experiment Name");
	$("#exp_name_value").html(sampleData.exp_name);

	var quesArray = sampleData.questions.length;
	for (var i = 0; i < quesArray; i++)
	{
		if (sampleData.questions[i].type === "checkBox") {
			renderQuesLabel();
			labelQues.innerHTML = sampleData.questions[i].name;
			var optionsDiv = document.createElement("label");
			optionsDiv.className = "col-md-4";
      		optionsDiv.id = sampleData.questions[i].name;
			var optionsLength = sampleData.questions[i].options.length;
			for (var j = 0; j < optionsLength; j++) {
				checkOption = document.createElement('input');
				ansLabel = document.createElement('label');
				checkOption.type = "checkbox";
				checkOption.className = "col-md-1";
				checkOption.value = sampleData.questions[i].options[j];
				ansLabel.className = "col-md-2"
				ansLabel.innerHTML = sampleData.questions[i].options[j];
				optionsDiv.appendChild(checkOption);
				optionsDiv.appendChild(ansLabel);
				$("#questions_list").append(optionsDiv);
			}
		}
		else if(sampleData.questions[i].type === "radioButton"){
			renderQuesLabel();
			labelQues.innerHTML = sampleData.questions[i].name;
			var optionsDiv1 = document.createElement("div");
      		optionsDiv1.id = sampleData.questions[i].name;
			optionsDiv1.className = "col-md-4";
			var optionsLength = sampleData.questions[i].options.length;
			for (var k = 0; k < optionsLength; k++) {
				radioOption = document.createElement('input');
				radioLabel = document.createElement('label');
				radioOption.type = "radio";
				radioOption.className = "col-md-1";
				radioLabel.className = "col-md-2";
				radioOption.name = sampleData.questions[i].name;
				radioOption.value = sampleData.questions[i].options[k];
				radioLabel.innerHTML = sampleData.questions[i].options[k];
				optionsDiv1.appendChild(radioOption);
				optionsDiv1.appendChild(radioLabel);
				$("#questions_list").append(optionsDiv1);
			}
		}

		else if(sampleData.questions[i].type === 'textBox') {
			renderQuesLabel();
			labelQues.innerHTML = sampleData.questions[i].name;
			ansTextBox = document.createElement("input");
			ansTextBox.className = "col-md-4"
      		ansTextBox.id = sampleData.questions[i].name;
			$("#questions_list").append(ansTextBox);
		}
	}
}

function submitFeedback() {
  	var feedback = {}; // the final feedback object
  	feedback.lab_name = sampleData.lab_name;
  	feedback.questions = []; // the list of questions and user answers
	var quesArray = sampleData.questions.length;

    // loop over the questions
	for (var i = 0; i < quesArray; i++) {
    // getByElementId using the question name - this is our answer div
	    var questionElement = document.getElementById(sampleData.questions[i].name);
	    var answer = null;
		if(sampleData.questions[i].type === 'radioButton') {
	  		for(var j = 0; j < questionElement.children.length; j++) {
	    		var child = questionElement.children[j];
	    		if(child.type === 'radio' && child.checked === true) {
	      			console.log('selected', child.value);
	      			answer = child.value;
	    		}
	  		}
		}
		else if(sampleData.questions[i].type === 'checkBox') {
	    	answer = [];
	    	for(var j = 0; j < questionElement.children.length; j++) {
	        var child = questionElement.children[j];
	        if(child.checked === true) {
	          console.log('selected', child.value);
	          answer.push(child.value);
	        }
	      }
	    }
		else if(sampleData.questions[i].type === 'textBox') {
	      	var input = questionElement;
	    	answer = input.value;
	    }
	    // create an object to insert the current question data
	    var question = {};
	    question.name = sampleData.questions[i].name;
	    question.type = sampleData.questions[i].type;
	    question.answer = answer;
	    feedback.questions.push(question);
	}
	console.log(feedback); // the final object
	console.log("Submitted feedback");
}
