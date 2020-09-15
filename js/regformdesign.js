
// Function to add data fields to skill array and its links 

var counterskill = 1;
function addskill(divName){
    var newdiv = document.createElement('div');
    newdiv.classList.add('row');
    newdiv.classList.add('skillrow');
    newdiv.innerHTML = `<div class=" col-md-6">
                            <label class="label">Skill ${counterskill+1}</label>
                            <input type="text" name="skills[]" class="form-control1">
                        </div>
                        <div class=" col-md-6">
                            <label class="label">Link To the Project</label>
                            <input type="text" class="form-control1" name="skilllinks[]"  placeholder="https://" >
                        </div>
                    `;
    document.getElementById(divName).appendChild(newdiv);
    counterskill++;    
}


// Function to add data fields to language array

var counterlanguage = 1;
function addlanguage(divName){
    var newdiv = document.createElement('div');
    newdiv.innerHTML = `<label class= 'langlabel'>Language ${counterlanguage+1} : </label><input type='text' class='form-control1 col-md-8 mb-2' style='margin-left:15px' name='languages[]'>`;
    document.getElementById(divName).appendChild(newdiv);
    counterlanguage++;    
}





// Function to post data

async function postData(url , data) {
    const response = await fetch(url, {
      method: "POST",       // *GET, POST, PUT, DELETE, etc.
      mode: "cors",         // no-cors, *cors, same-origin
      cache: "no-cache",    // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",    // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data),
    });
    return response.json();     // parses JSON response into native JavaScript objects
  }





  // Declare form object

const registrationform = document.getElementById("registrationform")


// Handle form events such as onsubmit
// Event listner

registrationform.addEventListener('submit',  function(e) {
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
        "email" : this.email.value,
        "password" : this.pass.value,
        "personal" : {
            "name" : this.name.value,
            "college" : this.college.value,
            "department" : this.college.value,
            "year" : this.year.value,
            "division" : this.division.value,
            "rollno" : this.rollno.value,
        },
        "social": {
            "phone": this.phone.value,
            "linkedin": this.linkden.value,
            "github":this.github.value,
            "personalwebsite": this.personalsite.value,
            "resume": this.resume.value,
            "iswhatsapp": iswhatsapp
        }, 
        "skills":{
            "skill" : skillarr,
            "projectsforskills" : projectsforskills,
            "topskill": this.topskill.value,
            "primaryskill" : this.primaryskill.value,
            "secondaryskill" : this.secondaryskill.value,
            "cgpa": this.cgpa.value
        },
        "rating":this.rating.value,
        "optionals": {
            "introduction": this.introduction.value,
            "gender": this.gender.value,
            "age" : this.age.value,
            "mother_tongue": this.mothertongue.value,
            "languages_known" : languagearr
        },
        "metaData":{
        }
    };


    githublink = `https://api.github.com/users/${this.github.value.substr(this.github.value.lastIndexOf('/') + 1)}`;    //Github api URL
    
    // Fetch api call to github

    fetch(githublink)
        .then(response=>response.json())
        .then(response=>{
            user["metaData"]["github_metadata_object"] = response;
        })

        // If github account exist then push student to database

        .then(async (response) => {

            let url = "https://skboard.herokuapp.com/api/register/student";     // URL for skboard api

            const res = await postData(url, user);                  // Post function
            console.log("Response =>" + JSON.stringify(res));       // Log the response
           
        })
        .catch(console.log(""))

})
