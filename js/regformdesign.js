const previousBtn = document.getElementById('previousBtn');
const nextBtn = document.getElementById('nextBtn');
const content = document.getElementById('content');
const bullets = [...document.querySelectorAll('.bullet')];
const formfields = [...document.querySelectorAll('.part')];

const MAX_STEPS = 4;
let currentStep = 1;



nextBtn.addEventListener('click', () => {
    var currentFields = formfields[currentStep - 1].getElementsByTagName('input')
    var linkFields = formfields[currentStep - 1].getElementsByClassName('link');

    console.log(linkFields);

    if (checkCurrentFields(currentFields)) {

        alert('Please enter all the required details below')
    }
    else if (checkLinkFields(linkFields)) {

    }
    else {
        bullets[currentStep - 1].classList.add('completed');
        currentStep += 1;

        previousBtn.disabled = false;
        if (currentStep !== 1) {
            formfields[currentStep - 2].classList.add('hide');
        }
        if (currentStep === MAX_STEPS) {
            nextBtn.disabled = true;
        }


        formfields[currentStep - 1].classList.remove('hide');
    }
});


previousBtn.addEventListener('click', () => {
    bullets[currentStep - 2].classList.remove('completed');
    formfields[currentStep - 1].classList.add('hide');
    currentStep -= 1;
    nextBtn.disabled = false;
    if (currentStep !== MAX_STEPS) {
        formfields[currentStep - 1].classList.remove('hide');
    }
    if (currentStep === 1) {
        previousBtn.disabled = true;
    }
});

previousBtn.disabled = true;
checkCurrentFields = (currentFields) => {
    for (var i = 0; i < currentFields.length; i++) {
        if (currentFields[i].value == '' && currentFields[i].required) {
            return true;
        }
    }
    return false;
}

checkLinkFields = (linkFields) => {
    if (linkFields.length == 0) {
        return false;
    }
    for (var i = 0; i < linkFields.length; i++) {
        if (!(linkFields[i].value.startsWith('https://'))) {
            alert('Please Enter a Valid Link starting with https://')
            return true;
        }
    }
    return false;

}

