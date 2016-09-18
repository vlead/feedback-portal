var sampleData = {
	"lab_name": "Computer Prog Lab",
	"exp_name": "Array",
	"user_name": "John", 
	"roll_no": "2016200523", 
	"year_sem": "2015-16", 
	"clg_name": "IIT Delhi",
	"user_id": "user123",
	"data": "11",
	"questions":
		[
			{
			"name": "1. Did you do the experiment?",
			"type": "radioButton",
			"options": ["Yes", "No"]
			},

			{
			"name": "2. Did the experiment work?",
			"type": "radioButton",
			"options": ["Yes", "No"]
			},

			{
			"name": "3. Did you find any bugs in the experiment? ",
			"type": "radioButton",
			"options": ["Yes", "No"]
			},

			{
			"name": "4. How much did you know about the experiment before doing it in Virtual Labs?",
			"type": "radioButton",
			"options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
			},

			
			{
			"name": "5. Is this experiment part of your curriculum?",
			"type": "radioButton",
			"options": ["Yes", "No"]
			},

			{
			"name": "6.  Does this help you to perform better in the curriculum?",
			"type": "radioButton",
			"options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
			},

			{
			"name": "7. Would you recommend it to your fellow students?",
			"type": "radioButton",
			"options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
			},

			{
			"name": "Any Comments?",
			"type": "textArea",
			}
		]
}

var labelQues, formGroup;
function renderQuesLabel() {
	formGroup = document.createElement("div");
	formGroup.className = "form-group"
	labelQues = document.createElement('label');
	//labelQues.className = "col-sm-12";
	document.getElementById("questions_list").appendChild(formGroup);
	formGroup.appendChild(labelQues);
}

function renderFeedbackform() {
	var user_name = document.getElementById("user_name");
	user_name.innerHTML = "Name: ";
	var user_name_value = document.getElementById("user_name_value");
	user_name_value.innerHTML = sampleData.user_name;

	var clg_name = document.getElementById("clg_name");
	clg_name.innerHTML = "College Name: ";
	var clg_name_value = document.getElementById("clg_name_value");
	clg_name_value.innerHTML = sampleData.clg_name;

	var year_sem = document.getElementById("year_sem");
	year_sem.innerHTML = "Year/Sem: ";
	var year_sem_value = document.getElementById("year_sem_value");
	year_sem_value.innerHTML = sampleData.year_sem;

	var roll_no = document.getElementById("roll_no");
	roll_no.innerHTML = "Roll No.: ";
	var roll_no_value = document.getElementById("roll_no_value");
	roll_no_value.innerHTML = sampleData.roll_no;

	var row = document.getElementById("row");
	// <input class="form-control" id="lab_name_value" disabled="true">
	row.className = "col-sm-10 rowCol";


	var lab_name_label = document.getElementById("lab_name_label");
	lab_name_label.innerHTML = "Lab Name";
	var lab_name_value = document.getElementById("lab_name_value");
	lab_name_value.value = sampleData.lab_name;

	var exp_name_label = document.getElementById("exp_name_label");
	exp_name_label.innerHTML= "Experiment Name";
	var exp_name_value = document.getElementById("exp_name_value");
	exp_name_value.value = sampleData.exp_name;

	var quesArray = sampleData.questions.length;
	for (var i = 0; i < quesArray; i++) {
		if (sampleData.questions[i].type === "checkBox") {
			renderQuesLabel();
			labelQues.innerHTML = sampleData.questions[i].name;
			var optionsDiv = document.createElement("div");
			//optionsDiv.className = "col-sm-12";
			optionsDiv.id = sampleData.questions[i].name;
			var optionsLength = sampleData.questions[i].options.length;
			for (var j = 0; j < optionsLength; j++) {
				checkOption = document.createElement('input');
				ansLabel = document.createElement('label');
				checkOption.type = "checkbox";
				//checkOption.className = "col-sm-1";
				checkOption.value = sampleData.questions[i].options[j];
				ansLabel.className = "checkbox-inline"
				ansLabel.innerHTML = sampleData.questions[i].options[j];
				//optionsDiv.appendChild(checkOption);
				optionsDiv.appendChild(ansLabel);
        ansLabel.insertBefore(checkOption, ansLabel.firstChild);
				formGroup.appendChild(optionsDiv);
				questions_list.appendChild(formGroup);
				// console.log("sampleData.questions[i].answers[j] is", sampleData.questions[i].answers[j])
			}
		}
		else if(sampleData.questions[i].type === "radioButton") {
			renderQuesLabel();
			labelQues.innerHTML = sampleData.questions[i].name;

			var optionsDiv1 = document.createElement("div");
			//optionsDiv1.className = "col-sm-12";
			optionsDiv1.id = sampleData.questions[i].name;
			var optionsLength = sampleData.questions[i].options.length;
			for (var k = 0; k < optionsLength; k++) {
				radioOption = document.createElement('input');
				radioLabel = document.createElement('label');
				radioOption.type = "radio";
				radioOption.className = "";
				radioLabel.className = "radio-inline";
				radioOption.name = sampleData.questions[i].name;
				radioOption.value = sampleData.questions[i].options[k];
				radioLabel.innerHTML = sampleData.questions[i].options[k];
				//optionsDiv1.appendChild(radioOption);
				optionsDiv1.appendChild(radioLabel);
        		radioLabel.insertBefore(radioOption, radioLabel.firstChild);
				formGroup.appendChild(optionsDiv1);
				questions_list.appendChild(formGroup);
			}
		}
    else if (sampleData.questions[i].type === "textArea") {
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
  	feedback.user_name = sampleData.user_name;
  	feedback.roll_no = sampleData.roll_no;
  	feedback.clg_name = sampleData.clg_name;
  	feedback.year_sem = sampleData.year_sem;
  	feedback.questions = []; // the list of questions and user answers
	  var quesArray = sampleData.questions.length;

    // loop over the questions
	for (var i = 0; i < quesArray; i++) {
	  var questionElement = document.getElementById(sampleData.questions[i].name);
	  var answer = null;
		if(sampleData.questions[i].type === 'radioButton') {
      var children = questionElement.querySelectorAll('input');
	  		for(var j = 0; j < children.length; j++) {
	    		var child = children[j];
          // console.log('child', child, child.type, child.checked);
	    		if(child.type === 'radio' && child.checked === true) {
	      			// console.log('selected', child.value);
	      			answer = child.value;
	      			
	    		}
	  		}
		}
		else if(sampleData.questions[i].type === 'checkBox') {
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
		else if(sampleData.questions[i].type === 'textBox') {
	      	var input = questionElement;
	    	  answer = input.value;
	  }
	  else if(sampleData.questions[i].type === 'textArea') {
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
