var cookie = document.cookie
var token = cookie.split(";")[2]
var accessToken = token.slice(15,token.length-1)

async function getData() {
    query = window.location.search
    user = query.substring(1)
    url = "https://skboard.herokuapp.com/api/student/" +user 
    console.log(url)
    let request = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Authorization":"Bearer "+accessToken
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: body // body data type must match "Content-Type" header
    })
    let data = request.json();
    return data
}

$(document).ready(() => {
    getData()
    .then(data =>{
        user = data.docs
        console.log(user)
        $("#name").val(user.personal.name)
        $("#college").val(user.personal.college)
        $("#department").val(user.personal.department)
        $("#year").val(user.personal.year)
        $("#div").val(user.personal.division)
        $("#rollno").val(user.personal.rollno)

        $("#intro").val(user.optionals.introduction)

        //Selected Gender
        const slectedGender = user.optionals.gender
        if(slectedGender == "Male")
            $("#male").attr("selected", true)
        else if(slectedGender == "Female")
            $("#female").attr("selected", true)
        else if(slectedGender == "Other")
            $("#other").attr("selected", true)

        $("#age").val(user.optionals.age)
        $("#mother_tng").val(user.optionals.mother_tongue)

        $("#primary").val(user.skills.primaryskill)
        $("#secondary").val(user.skills.secondaryskill)
        $("#cgpa").val(user.skills.cgpa)
        $("#rating").val(user.rating)

        $("#phone").val(user.social.phone)
        $("#linkedin").val(user.social.linkedin)
        $("#github").val(user.social.github)
        $("#personalsite").val(user.social.personalwebsite)
        $("#resume").val(user.social.resume)
        
        // Is whatsapp check
        if(user.social.iswhatsapp) {
            $("#whatsapp").prop( "checked", true );
        }

        // Language Control
        var counterlanguage;
        var wrapper = $(".languageform");

        for(i in user.optionals.languages_known ) {
            if (i==0){
                $(wrapper).append(`
                <div>
                    <label class= 'langlabel'>&#9656; </label><input type="text" value="${user.optionals.languages_known[i]}" name="languages[]" style='margin-left:15px'  class="form-control1 col-md-8 mb-2"  required>
                </div>
            `
            );
            }
            else{
                $(wrapper).append(`
                    <div>
                        <label class= 'langlabel'>&#9656; </label><input type="text" value="${user.optionals.languages_known[i]}" name="languages[]" style='margin-left:15px'  class="form-control1 col-md-8 mb-2"  required>
                        <a href="#" style="text-decoration:none"  class="delete ">Delete</a>
                    </div>
                `
                );  //add input box
            }
            counterlanguage = parseInt(i)+1;
        };

        // Skill Control
        var wrapper = $(".skillform");
        var counterskill;
        
        for(i in user.skills.skill ) {
            if(i==0){
                $(wrapper).append(`<div>
                                        <div class="row skillrow">
                                            <div class=" col-md-6">
                                                <label class="label">Skill </label>
                                                <input type="text" name="skills[]" value="${user.skills.skill[i]}" class="form-control1" required>
                                            </div>
                                            <div class=" col-md-6">
                                                <label class="label">Link To the Project</label>
                                                <input type="text" class="form-control1" name="skilllinks[]" value="${user.skills.projectsforskills[i]}"  placeholder="https://" required>
                                            </div>
                                        </div>
                                    </div>`);  //add input box
            }
            else{
                $(wrapper).append(`<div>
                                        <div class="row skillrow">
                                            <div class=" col-md-6">
                                                <label class="label">Skill </label>
                                                <input type="text" name="skills[]" value="${user.skills.skill[i]}" class="form-control1" required>
                                            </div>
                                            <div class=" col-md-6">
                                                <label class="label">Link To the Project</label>
                                                <input type="text" class="form-control1" name="skilllinks[]" value="${user.skills.projectsforskills[i]}"  placeholder="https://" required>
                                            </div>
                                        </div>
                                        <a href="#" style="text-decoration:none" class="delete float-right">Delete</a>
                                    </div>`); //add input box
            }
            counterskill = parseInt(i)+1;
        }


    })
})

// Add Floating Labels to UpdateProfile Form
function floatingLabel(container) {
    let label = container.querySelector("label"),
        input = container.querySelector("input");

    input.addEventListener("focus", function() {
        label.classList.add("label-up");
        label.classList.remove("label-up-blur")
        input.classList.remove("input-up-blur")
        label.classList.add("label-up-focus")
    });

    input.addEventListener("blur", function() {
        let length = input.value.length;

        if (length > 0) { // if there is text, hold the label up
        label.classList.remove("label-up-focus")
        label.classList.add("label-up-blur")
        input.classList.add("input-up-blur")
        } else { // if not, get to main position
        label.classList.remove("label-up")
        label.classList.remove("label-up-blur")
        label.classList.remove("label-up-focus")
        input.classList.remove("input-up-blur")
        }

    })
}
let floatingLabelContainers = document.querySelectorAll(".floatingLabelContainer");
floatingLabelContainers.forEach(container => {
    floatingLabel(container)
})  
