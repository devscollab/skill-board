function register() {
    //personal info
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var name = document.getElementById("name").value;
    var college = document.getElementById("college").value;
    var department = document.getElementById("department").value;
    var year = document.getElementById("year").value;
    var division = document.getElementById("division").value;
    var rollno = document.getElementById("rollno").value;
    //social info
    var phone = document.getElementById("phone").value;
    var iswhatsapp = document.getElementById("isWhatsapp").value;
    var linkedin = document.getElementById("linkedin").value;
    var github = document.getElementById("github").value;
    var personalwebsite = document.getElementById("personalWebsite").value;
    var resume = document.getElementById("resume").value;
    //skills
    var primaryskill = document.getElementById("primarySkill").value;
    var secondaryskill = document.getElementById("secondarySkill").value;
    var skill = document.getElementById("otherskills").value;
    var projectsforskills = document.getElementById("project").value;
    var cgpa = document.getElementById("sgpa").value;
    let skillArray = [];
    skillArray.push(skill);
    let projectArray = [];
    projectArray.push(projectsforskills);
    //optional info
    var introduction = document.getElementById("introduction").value;
    var gender = document.getElementById("gender").value;
    var age = document.getElementById("age").value;
    var mother_tongue = document.getElementById("motherTongue").value;
    var languages_known = document.getElementById("knownLanguage").value;
    let languageArray = [];
    languageArray.push(languages_known);

    personal = {
        name: name,
        college: college,
        department: department,
        year: year,
        division: division,
        rollno: rollno
    }

    social = {
        phone: phone,
        iswhatsapp: iswhatsapp,
        linkedin: linkedin,
        github: github,
        personalwebsite: personalwebsite,
        resume: resume
    }

    skills = {
        primaryskill: primaryskill,
        secondaryskill: secondaryskill,
        skill: skillArray,
        projectsforskills: projectArray,
        cgpa: cgpa
    }

    optionals = {
        introduction: introduction,
        gender: gender,
        age: age,
        mother_tongue: mother_tongue,
        languages_known: languageArray,
    }

    //create user object
    user = {
            email: email,
            password: password,
            personal: personal,
            social: social,
            skills: skills,
            optionals: optionals,
            metaData: {}
        }
        //console.log(user)

    let url = "https://skboard.herokuapp.com/api/register/student"

    fetch(url, {
        method: 'post',
        body: JSON.stringify(user)
    }).then(function(response) {
        console.log(response.json());
    }).catch(err => {
        alert(err);
    })
}