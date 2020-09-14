const  previousBtn  =  document.getElementById('previousBtn');
const  nextBtn  =  document.getElementById('nextBtn');
const  finishBtn  =  document.getElementById('finishBtn');
const  content  =  document.getElementById('content');
const  bullets  =  [...document.querySelectorAll('.bullet')];
const formfields = [...document.querySelectorAll('.part')];

const MAX_STEPS = 4;
let currentStep = 1;

nextBtn.addEventListener('click',  ()  =>  {
    bullets[currentStep  -  1].classList.add('completed');
	currentStep  +=  1;
    previousBtn.disabled  =  false;
    if (currentStep  !==  1) {
        formfields[currentStep  -  2].classList.add('hide');
    }
	if  (currentStep  ===  MAX_STEPS)  {
        nextBtn.disabled  =  true;
		finishBtn.disabled  =  false;
	}
    formfields[currentStep -1].classList.remove('hide');
});


previousBtn.addEventListener('click',  ()  =>  {
	bullets[currentStep  -  2].classList.remove('completed');
    formfields[currentStep  -  1].classList.add('hide');
	currentStep  -=  1;
	nextBtn.disabled  =  false;
    finishBtn.disabled  =  true;
    if (currentStep  !==  MAX_STEPS) {
        formfields[currentStep  - 1].classList.remove('hide');
    }
	if  (currentStep  ===  1)  {
        previousBtn.disabled  =  true;
	}
});

finishBtn.addEventListener('click',  ()  =>  {
	location.reload();
});



