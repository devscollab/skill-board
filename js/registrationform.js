

// Add Fields Testing
$(document).ready(function () {
    var max_fields = 10;
    var wrapper = $(".languageform");
    var add_button = $(".addlangbtn");

    var counterlanguage = 1;
    $(add_button).click(function (e) {
        e.preventDefault();
        if (counterlanguage < max_fields) {
            counterlanguage++;
            $(wrapper).append(`<div><label class= 'langlabel'>&#9656; </label><input type="text" name="languages[]" style='margin-left:15px'  class="form-control1 col-md-8 mb-2"  required><a href="#" style="text-decoration:none"  class="delete ">Delete</a></div>`);  //add input box
        } else {
            alert('You Reached the limits')
        }
    });

    $(wrapper).on("click", ".delete", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        counterlanguage--;
    })
});


$(document).ready(function () {
    var max_fields = 10;
    var wrapper = $(".skillform");
    var add_button = $(".addskillbtn");

    var counterskill = 1;
    $(add_button).click(function (e) {
        e.preventDefault();
        if (counterskill < max_fields) {
            counterskill++;
            $(wrapper).append(`<div>
                                    <div class="row skillrow">
                                        <div class=" col-md-6">
                                            <label class="label">Skill </label>
                                            <input type="text" name="skills[]" class="form-control1" required>
                                        </div>
                                        <div class=" col-md-6">
                                            <label class="label">Link To the Project</label>
                                            <input type="text" class="form-control1" name="skilllinks[]" placeholder="https://" required>
                                        </div>
                                    </div>
                                    <a href="#" style="text-decoration:none" class="delete float-right">Delete</a>
                                </div>`);  //add input box
        } else {
            alert('You Reached the limits')
        }
    });

    $(wrapper).on("click", ".delete", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        counterskill--;
    })
});






// Function to post data

async function postData(url, data) {
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: body // body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
    if (response.status == "200") {
        alert("Registered Succesfully! An Administrator will review and approve your profile shortly. Once approved, your account will be visible on the listing page. Meanwhile, you can login and view the existing accounts listing.")
        window.location.href = "login.html"
    }
    return response.json(); // parses JSON response into native JavaScript objects
}





// Declare form object

const registrationform = document.getElementById("registrationform")


// Handle form events such as onsubmit
// Event listner
registrationform.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get the skills and links to projects array
    skillarr = [];
    projectsforskills = []
    var skill = document.getElementsByName('skills[]');
    var link = document.getElementsByName('skilllinks[]');

    for (var i = 0; i < skill.length; i++) {
        skillarr.push(skill[i].value)
        projectsforskills.push(link[i].value)
    }

    // Get the languages array
    languagearr = []
    var languages = document.getElementsByName('languages[]');
    for (var i = 0; i < languages.length; i++) {
        languagearr.push(languages[i].value)
    }

    var iswhatsapp = false;
    if (this.iswhatsapp.value === "on") {
        iswhatsapp = true;
    }


    const use1r = new FormData(this);
    // Object To be posted
    var user = {
        "email": this.email.value,
        "password": this.pass.value,
        "personal": {
            "name": this.name.value,
            "college": this.college.value,
            "department": this.department.value,
            "year": this.year.value,
            "division": this.division.value,
            "rollno": this.rollno.value,
        },
        "social": {
            "phone": this.phone.value,
            "linkedin": this.linkden.value,
            "github": this.github.value,
            "personalwebsite": this.personalsite.value,
            "resume": this.resume.value,
            "iswhatsapp": iswhatsapp
        },
        "skills": {
            "skill": skillarr,
            "projectsforskills": projectsforskills,
            "primaryskill": this.primaryskill.value,
            "secondaryskill": this.secondaryskill.value,
            "cgpa": this.cgpa.value
        },
        "rating": this.rating.value,
        "optionals": {
            "introduction": this.introduction.value,
            "gender": this.gender.value,
            "age": this.age.value,
            "mother_tongue": this.mothertongue.value,
            "languages_known": languagearr,
            "pronoun": this.pronoun.value
        },
        "metaData": {
            "hasAdminAccess": false
        }
    };
    if (!checkLinkFields(link)) {
        githublink = `https://api.github.com/users/${this.github.value.substr(this.github.value.lastIndexOf('/') + 1)}`; //Github api URL

        // Fetch api call to github
        fetch(githublink)
            .then(response => response.json())
            .then(response => {
                user["metaData"]["github_metadata_object"] = response;
            })
            // If github account exist then push student to database
            .then(async (response) => {

                let url = "https://skboard.herokuapp.com/api/register"; // URL for skboard api

                const res = await postData(url, user); // Post function
                console.log("Response =>" + JSON.stringify(res));   // Log the response

            })
            .catch(console.log(""))
    }
    else {
        alert('Please Enter a valid link starting with https://')
    }
})
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