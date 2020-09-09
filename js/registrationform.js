async function register() {
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
  var flag = document.getElementById("isWhatsapp").value;
  var iswhatsapp = false;
  if (flag === "on") {
    iswhatsapp = true;
  }
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
      rollno: rollno,
    };

    social = {
      phone: phone,
      iswhatsapp: iswhatsapp,
      linkedin: linkedin,
      github: github,
      personalwebsite: personalwebsite,
      resume: resume,
    };

    // Just complete the logic of array

  skills = {
    primaryskill: primaryskill,
    secondaryskill: secondaryskill,
    skill: ["nodejs", "java"],
    projectsforskills: ["https://github.com/Aditya-Dawadikar", "https://github.com/Aditya-Dawadikar"],
    cgpa: cgpa,
  };

  optionals = {
    introduction: introduction,
    gender: gender,
    age: age,
    mother_tongue: mother_tongue,
    languages_known: ['marathi', 'english'],
  };

  //create user object

  const github_metadata_object =  await getGithubData();
  
  user = {
    email: email,
    password: password,
    personal: personal,
    social : social,
    skills: skills,
    optionals : optionals,
    metaData: {
      github_metadata_object:github_metadata_object
    },
  };
  //console.log(user)

  let url = "http://localhost:3000/api/register/student";

  const response = await postData(url,user);
  console.log(response);
}

async function getGithubData(user){
  const url =  `https://api.github.com/users/${social.github.substr(social.github.lastIndexOf('/') + 1)}`
  console.log(url);
  const data =await fetch(url);
  const json = await data.json();
  return json
}

async function postData(url = "", data) {

  console.log(data);
  

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
  console.log('Response');
  return response.json(); // parses JSON response into native JavaScript objects
}
