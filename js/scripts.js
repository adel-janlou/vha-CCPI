/*!
* undefined v1.0.0 (https://github.com/Gigyjon/VANOP#readme)
* Copyright 2013-2023 David Miller <david@blackrockdigital.io>
*/
$(document).ready(function () {

    // Home banner carousel
    $('.page-section__home-banner--carousel').slick({
        arrows: false,
        dots: true,
        fade: true,
        draggable: false,
        autoplay: true,
        autoplaySpeed: 4000,
    });

    // Home cancer care carousel
    $('.page-section__home-cancer-care--carousel').slick({
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [{
            breakpoint: 639,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }]
    });

    // Readmore plugin for about page
    $('.vendor-readmore').readmore({
        collapsedHeight: 100,
        moreLink: '<div class="display-flex flex-justify-center margin-top-2"><a class="display-inline-flex flex-align-center padding-x-2 text-white bg-primary" href="javascript:void(0);" title="Read More"><svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img"><use xlink:href="assets/img/sprite.svg#expand_more"></use></svg></a></div>',
        lessLink: '<div class="display-flex flex-justify-center margin-top-2"><a class="display-inline-flex flex-align-center padding-x-2 text-white bg-primary" href="javascript:void(0);" title="Close"><svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false" role="img"><use xlink:href="assets/img/sprite.svg#expand_less"></use></svg></a></div>'
    });

    // Highlight current page link in nav
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $('nav.usa-nav ul.usa-nav__primary li.usa-nav__primary-item a.usa-nav-link').each(function () {
        if (this.href === path) {
            $(this).addClass('usa-current');
        }
    });

    // Careers testimonials carousel
    $('.page-section__careers-testimonials--carousel').slick({
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [{
            breakpoint: 639,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }]
    });

});

// Survey_js start

// Setup for the choose your own adventury style JS for the cancer screening survey

var story = 0; // keep story from being undefined 

// var form = document.getElementById('theAdventure'); // get the element with matching ids
var form = $("#survey_form");
var submit = $("#next_btn_survey");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

var reset = document.getElementById('resetButton');
var answer = '';

var story_telling = {
    "start": { //beginning of the story
        "question": "What gender were you assigned at birth?",
        "answers": {
            "a": "Male",
            "b": "Female",
        },
        "status" : true,
        "class" : "survey_gender",
    },

    "1": {
        "question": "How old are you?",
        "answers": {
            "a": "21-29",
            "b": "30-39",
            "c": "40-44",
            "d": "45-49",
            "e": "50-59",
            "f": "60-65",
            "g": "66-75",
            "h": "76-80",
            "i": "Over 80",
        },
        "status" : true,
        "class" : "survey_age",
    },

    "2": {
    	"question": "Do you smoke currently, or have you smoked in the past 15 years?",
    	"answers": {
    		"a": "Yes",
    		"b": "No"
    	}
    },

    "3": {
    	"question": "If you currently smoke cigarettes or used them in the past, which of the following best describes your use?",
    	"answers": {
    		"a": "One pack a day for at least 20 years",
    		"b": "Two packs a day for at least 10 years",
    		"c": "More than two packs a day for at least 10 years",
    		"d": "Less than one pack a day for at least 20 years"
    	}
    },

    "4": {
    	"question": "Do you have a family history of cancer?",
    	"answers": {
    		"a": "Yes",
    		"b": "No",
    		"c": "I'm not sure."
    	}
    }
};

/*
Add any additional tests here
 */
function getTest(answer) {
	let obj = {
		"a": {
			"d": {
				"tests": ['colorectal']
			},
			"e": {
				"tests": ['colorectal', 'lung']
			},
			"f": {
				"tests": ['colorectal', 'lung']
			},
			"g": {
				"tests": ['colorectal', 'lung']
			},
			"h": {
				"tests": ['colorectal']
			}
		},
		"b": {
			"a": {
				"tests": ['cervical']
			},
			"b": {
				"tests": ['cervical']
			},
			"c": {
				"tests": ['cervical', 'breast']
			},
			"d": {
				"tests": ['cervical', 'breast', 'colorectal']
			},
			"e": {
				"tests": ['cervical', 'breast', 'colorectal', 'lung']
			},
			"f": {
				"tests": ['cervical', 'breast', 'colorectal', 'lung']
			},
			"g": {
				"tests": ['breast', 'colorectal', 'lung']
			},
			"h": {
				"tests": ['breast', 'lung']
			},
			"i": {
				"tests": ['breast']
			}
		},
		"tests": ['low-risk']
	};

	let lastKnownTest = false;
	for (var i = 0; i < answer.length; i++) {
		if ("tests" in obj) lastKnownTest = obj.tests;

		if (answer[i] in obj) obj = obj[answer[i]];
	}

	return lastKnownTest;
}

function showSurveyResult(answer) {
	const test = getTest(answer);

	// console.log('showSurveyResult', answer, test);

	if (!test) return;

	prop_model(test);
}

// Continue link

document.cancerScreeningAnswers = '';
$(submit).on("click",function (e) {
    e.preventDefault();
    answer = form.find('input[type=radio]:checked')[0].value; //a list of the document's elements that match the specified group of selectors.
    
    if (answer) {
    	document.cancerScreeningAnswers += answer;
		if (document.cancerScreeningAnswers.length === 5) {
			showSurveyResult(document.cancerScreeningAnswers);
			return;
		}

        story++; //increment or add 1 to
        populateForm(story); //if a radio is checked populate our form with the answer
        console.log("Story time!"); // Console log to make sure things are working
    }
})


// Reset button
function resetForm() {
    document.getElementById("theAdventure").reset();
}

// Generate answers from story
function populateForm(story) {
    var current_story = story_telling[story]; //take values from story_telling story
    var text = '';

    for (var prop in current_story['answers']) {

        class_ = prop.replace(/ /g,"_");
        if (current_story['answers'].hasOwnProperty(prop)) { //method returns a boolean (true or false) indicating whether the object has the specified property as its own property
            text += '<div class="usa-radio"><input type="radio" class="usa-radio__input usa-radio__input--tile survey_'+class_+' '+current_story['class']+'" id="survey_'+class_+'" name="answer" value="' + prop + '"/><label class="usa-radio__label" for="survey_'+class_+'">' + current_story['answers'][prop] + '</label></div>'; // adding answers to the story
        }
    }

    // form.querySelector('legend').innerHTML = current_story.question; //write questions to the p tag in the HTML
    form.find('.usa-legend').html(current_story.question)
    form.find(".form_options").html(text)
    // form.querySelector('fieldset').innerHTML = text; //write answers to the fieldset 
}

populateForm('start'); //set the form at the beginning

var age_result = {
    "breast": { //beginning of the story
        "header1" : {
            "heading": "Breast Cancer Screening",
            "content": "A mammogram provides an X-ray of the breast and is the best way to find breast cancer for most adults. If mammography is not available at your local VA Medical Center, ask to be referred to another VA that has mammography, or out to Community Care.",
        },
        "header2" : {
            "heading": "Who should get screened?",
            "content": {
                       "1" : "• Women 40-44 should have the opportunity to begin annual screening", 
                       "2" : "•  Women 45-54 should be screened annually",
                       "3" : "• Women 55+ should be screened every other year or have the opportunity to continue screening annually.",
                    },
            "link" : "/assets/pdf/survey/NOP_Breast Cancer Screening_Flyer_v2.pdf",
        }
    },
    "cervical": { //beginning of the story
        "header1" : {
            "heading": "Cervical Cancer Screening",
            "content": "Two tests, the Pap and HPV tests, can help prevent cervical cancer. Pap tests look for cell changes on the cervix that could become cervical cancer. HPV tests look for the human papillomavirus (HPV) that can cause cells on the cervix to become cancerous. Both tests involve a pelvic examination in which a metal or plastic device, called a speculum, is inserted in the vagina to view the cervix. A small brush is then used to collect cells from the cervix.",
        },
        "header2" : {
            "heading": "Who should get screened?",
            "content": {
                       "1" : "• Women 21-29 should get a Pap test every 3 years", 
                       "2" : "• Women 30-65 should get screened every 3-5 years depending on the test chosen (Pap test alone is every 3 years; both Pap and HPV testing is every 5 years; and HPV testing alone is every 5 years)",
                    },
            "link" : "/assets/pdf/survey/NOP_Cervical Cancer Screening_Flyer_v2.pdf",
        }
    },
    "colorectal": { //beginning of the story
        "header1" : {
            "heading": "Colorectal Cancer Screening",
            "content": "Colorectal cancer screenings check for abnormal growths in the colon or rectum. VA offers the following tests to screen for colon cancer: <br>•   Fecal immunochemical test (FIT) <br>•   Colonoscopy <br>•   Flexible Sigmoidoscopy. <br>During a colonoscopy, polyps can be removed before they become cancer. FIT screening is done at home to check for blood in stool that you can’t see. If either FIT or flexible sigmoidoscopy detects an abnormality, colonoscopy is necessary."
        },
        "header2" : {
            "heading": "Who should get screened?",
            "main" : "Adults aged 45-75 without any known increased risk of colorectal cancer should be screened with one of the following, based on a conversation with their primary care provider:",
            "content": {
                        "1" : "•  Home-based FIT every year", 
                        "2" : "•  Flexible sigmoidoscopy every 5 years, or every 10 years with a FIT every year",
                        "3" : "•  Colonoscopy every 10 years",
                        "4" : "•  Colonoscopy may be recommended if you have any symptoms of colorectal cancer (e.g., rectal bleeding), a personal history of polyps, or a family history of colon or rectal cancer or polyps."
                    },
                    "link" : "/assets/pdf/survey/NOP_Colorectal Cancer Screening_Flyer_v2.pdf",
        }
    },
    "lung": { //beginning of the story
        "header1" : {
            "heading": "Lung Cancer Screening",
            "content": "VA uses a low-dose computed tomography (CT) scan to look for signs of lung cancer. This CT scan uses a low dose of x-rays to take detailed pictures of your lungs.",
        },
        "header2" : {
            "heading": "Who should get screened?",
            "main" : "You may qualify if you meet these three conditions:",
            "content": {
                        "1" : "•    Are 50-80 years old", 
                        "2" : "•    Smoke cigarettes now or quit within the past 15 years",
                        "3" : "•    Smoked cigarettes for at least 20 pack-years*",
                    },
            "footer" : "*A “pack-year” is an estimate how many cigarettes you have smoked in your lifetime. 20 “pack-years” equals smoking one pack of cigarettes a day for 20 years or two packs of cigarettes a day for 10 years.",
            "link" : "/assets/pdf/survey/Lung_Cancer_Flyer_v11.pdf",
        },
        "header3" : {
            "heading": "What are your next steps for cancer screening?",
            "content": {
                "1" : "•    Talk to your primary care provider to determine whether you are due for any of the screenings listed here and ask any questions you might have. ", 
                "2" : "•    Share this page with a fellow Veteran. <b>You just might save a life.</b>",
            },
            "img_src" : ""
        },
    },
    "low-risk": {
    	"header1": {
    		"heading": "Example header for low risk",
    		"content": "Content for low risk"
    	},
    	"header2": {
    		"heading": "Example header for low risk",
    		"content": "Content for low risk"
    	},
    	"header3": {
    		"heading": "Example header for low risk",
    		"content": "Content for low risk"
    	}
    }
    
}


function prop_model(e) {

    total_lenght = e.length;
    text = '<div>';
    for (var i = 0; i < total_lenght; i++) {
        console.log(e[i]);
        survey_res_var = e[i];
        text +=  "<div class='popup_header_one'>"; 
        text +=  "<h2>"+age_result[survey_res_var]['header1']['heading']+"</h2>";
        text +=  "<p>"+age_result[survey_res_var]['header1']['content']+"</p>";
        text +=  "</div>";

        text +=  "<div class='popup_header_two'>"; 
        text +=  "<h3>"+age_result[survey_res_var]['header2']['heading']+"</h3>";
        if(age_result[survey_res_var]['header2']['main'] !== '' && age_result[survey_res_var]['header2']['main'] !== undefined){
            text +=  "<p>"+age_result[survey_res_var]['header2']['main']+"</p>";
        }
        for (var prop in age_result[survey_res_var]['header2']['content']) {

            if (age_result[survey_res_var]['header2']['content'].hasOwnProperty(prop)) { //method returns a boolean (true or false) indicating whether the object has the specified property as its own property
                text +=  "<p>"+age_result[survey_res_var]['header2']['content'][prop]+"</p>";
            }
        }
       if(age_result[survey_res_var]['header2']['link'] !== '' && age_result[survey_res_var]['header2']['link'] !== undefined){
           text +=  "<p><a href='"+age_result[survey_res_var]['header2']['link']+"' target='_blank'>Learn More</a></p>";
       }
        text +=  "</div>";

        if(age_result[survey_res_var]['header3'] !== undefined){

             text +=  "<div class='popup_header_three'>"; 
             text +=  "<h3>"+age_result[survey_res_var]['header3']['heading']+"</h3>";
             if(age_result[survey_res_var]['header3']['main'] !== '' && age_result[survey_res_var]['header3']['main'] !== undefined){
                 text +=  "<p>"+age_result[survey_res_var]['header3']['main']+"</p>";
             }
             for (var prop in age_result[survey_res_var]['header3']['content']) {

                 if (age_result[survey_res_var]['header3']['content'].hasOwnProperty(prop)) { //method returns a boolean (true or false) indicating whether the object has the specified property as its own property
                     text +=  "<p>"+age_result[survey_res_var]['header3']['content'][prop]+"</p>";
                 }
             }
            if(age_result[survey_res_var]['header3']['img_src'] !== '' && age_result[survey_res_var]['header2']['link'] !== undefined){
                text +=  "<p><img src='"+age_result[survey_res_var]['header3']['img_src']+"' width='300'></p>";
            }
             text +=  "</div>";


        }

    }
    text += '</div>';
    $(".survvey_age_model_content").html(text);
     modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Survey Js ENd