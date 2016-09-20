var sampleData = {
	"lab_name": "Computer Prog Lab",
	"exp_name": "Array",
	"user_id": "user123",
	"key": "sdsfsdfsdf",
	"questions":
		[
			{
			"name": "1. Did you do the experiment?",
			"type": "radio",  
			"options": ["Yes", "No"]
			},

			{
			"name": "2. Did the experiment work?",
			"type": "radio",
			"options": ["Yes", "No"]
			},

			{
			"name": "3. Which of the following course/s covers this concept? ",
			"type": "checkbox", 
			"options": ["Computer Science", "Electronics Science", "Physical Science", "Humanities"]
			},

			{
			"name": "4. How much did you know about the experiment before doing it in Virtual Labs?",
			"type": "radio",
			"options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
			},

			
			{
			"name": "5. Is this experiment part of your curriculum?",
			"type": "radio",
			"options": ["Yes", "No"]
			},

			{
			"name": "6.  Does this help you to perform better in the curriculum?",
			"type": "radio",
			"options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
			},

			{
			"name": "7. Would you recommend it to your fellow students?",
			"type": "radio",
			"options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
			},

			{
			"name": "Any Comments?",
			"type": "text", 
			}
		]
}

var labelQues, formGroup;
function renderQuesLabel() {
	formGroup = document.createElement("div");
	formGroup.className = "form-group"
	labelQues = document.createElement('label');
	$("#questions_list").append(formGroup);
	formGroup.appendChild(labelQues);
}

function renderFeedbackform() {
	$("#lab_name_label").html("Lab Name");
	$("#lab_name_value").val(sampleData.lab_name)

	$("#exp_name_label").html("Experiment Name");
	$("#exp_name_value").val(sampleData.exp_name)

    var quesArray = sampleData.questions.length;
	for (var i = 0; i < quesArray; i++) {
		if (sampleData.questions[i].type === "checkbox") {
			renderQuesLabel();
			labelQues.innerHTML = sampleData.questions[i].name;
			var optionsDiv = document.createElement("div");
			optionsDiv.id = sampleData.questions[i].name;
			var optionsLength = sampleData.questions[i].options.length;

			for (var j = 0; j < optionsLength; j++) {
				checkOption = document.createElement('input');
				checkOption.type = "checkbox";
				checkOption.value = sampleData.questions[i].options[j];

				ansLabel = document.createElement('label');
				ansLabel.className = "checkbox-inline"
				ansLabel.innerHTML = sampleData.questions[i].options[j];

				optionsDiv.appendChild(ansLabel);
        		ansLabel.insertBefore(checkOption, ansLabel.firstChild);
				formGroup.appendChild(optionsDiv);
				questions_list.appendChild(formGroup);
			}
		}

		else if(sampleData.questions[i].type === "radio") {
			renderQuesLabel();
			labelQues.innerHTML = sampleData.questions[i].name;
			var optionsDiv1 = document.createElement("div");
			optionsDiv1.id = sampleData.questions[i].name;
			var optionsLength = sampleData.questions[i].options.length;

			for (var k = 0; k < optionsLength; k++) {
				radioOption = document.createElement('input');
				radioOption.type = "radio";
				radioOption.className = "";
				radioOption.name = sampleData.questions[i].name;
				radioOption.value = sampleData.questions[i].options[k];

				radioLabel = document.createElement('label');
				radioLabel.className = "radio-inline";
				radioLabel.innerHTML = sampleData.questions[i].options[k];

				optionsDiv1.appendChild(radioLabel);
        		radioLabel.insertBefore(radioOption, radioLabel.firstChild);
				formGroup.appendChild(optionsDiv1);
				questions_list.appendChild(formGroup);
			}
		}
    	else if (sampleData.questions[i].type === "text") {
      		var ansTextArea;
			renderQuesLabel();
			labelQues.innerHTML = sampleData.questions[i].name;

			ansTextArea = document.createElement("textarea");
			ansTextArea.className = "form-control"
			ansTextArea.id = sampleData.questions[i].name;

			formGroup.appendChild(ansTextArea);
    }
		else if(sampleData.questions[i].type === 'textBox') {
      		var ansTextBox;
			renderQuesLabel();
			labelQues.innerHTML = sampleData.questions[i].name;

			ansTextBox = document.createElement("input");
			ansTextBox.className = "form-control"
			ansTextBox.id = sampleData.questions[i].name;

			formGroup.appendChild(ansTextBox);
		}
	}
}

function submitFeedback(event) {

    event.preventDefault();
  	var feedback = {}; // the final feedback object
  	feedback.lab_name = sampleData.lab_name;
  	feedback.exp_name = sampleData.exp_name;
  	feedback.user_id = sampleData.user_id;
  	feedback.key = sampleData.key;
  	
  	feedback.responses = []; // the list of questions and user answers
	var quesArray = sampleData.questions.length;
    // loop over the questions
	for (var i = 0; i < quesArray; i++) {
		var questionElement = document.getElementById(sampleData.questions[i].name);
		var answer = null;
		if(sampleData.questions[i].type === 'radio') {
      	var children = questionElement.querySelectorAll('input');
	  		for(var j = 0; j < children.length; j++) {
	    		var child = children[j];
        		// console.log('child', child, child.type, child.checked);
	    		if(child.type === 'radio' && child.checked === true) {
	      			answer = child.value;
	    		}
	  		}
		}
		else if(sampleData.questions[i].type === 'checkbox') {
	    	answer = [];
	        var children = questionElement.querySelectorAll('input');
	    	for(var j = 0; j < children.length; j++) {
	        var child = children[j];
	        if(child.checked === true) {
	            // console.log('selected', child.value);
	        	answer.push(child.value);
	        }
	      }
	    }
		else if(sampleData.questions[i].type === 'text') {
	      	var input = questionElement;
	        answer = input.value;
	  	}
	  	else if(sampleData.questions[i].type === 'text') {
	      	var input = questionElement;
	    	answer = input.value;
	  	}
	  	// create an object to insert the current question data
	  	var questions = {};
	  	questions.name = sampleData.questions[i].name;
	  	questions.type = sampleData.questions[i].type;
	  	questions.answer = answer;
	  	feedback.responses.push(questions);
	}
	console.log(feedback); // the final object
	console.log("Submitted feedback");
}
