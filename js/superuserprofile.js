function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2){
      var cookie = parts.pop().split(';').shift();
      return cookie.substring(1, cookie.length-1)
    }   
}
var role = getCookie("role")
var currentUser = getCookie("currentUser")

async function getData() {
    var accessToken = getCookie("access_token")
    query = window.location.search
    user = query.substring(1)
    url = "https://skboard.herokuapp.com/api/superuser/" +user 
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
        user = data.docs[0]
        console.log(user)
        $("#profile").append(`
        <div class="container-fluid">
        <div class="row">
            <div class="col-12  leftSide" style="padding: 20px 40px;">
                <div class="leftSideWrapper">
                <a href="./superuserslist.html"><button class="btn btn-outline-dark">Go Back</button></a>
                <div id = "admin" style="text-align: center"></div>
                    <img class="profileImg" src="https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png"/>
                    <div class="centerElem">
                    
                        <h2>${user.personal.name}</h2>

                        <a href="./updateProfile.html?${user._id}">
                        <button class="btn" style="margin-top: 15px; background-color: skyblue; padding: 10px 20px;">
                            Update Profile
                        </button>
                        </a>
                        <div id = "deleteBtn">
                        <br>
                        </div>
                        <br>
                        <a href="${user.social.resume}" target="_blank">
                        <button class="btn" style="background-color: rgb(77, 255, 77); padding: 10px 20px;">
                            Download Full Resume
                        </button>
                        </a>
                    </div>

                    <div>
                        <div class="socialsList" style="margin: 60px 0;">
                            <div class="row">
                                <div class="col">
                                    <span class="boldElem">College</span> <br>
                                    <span class="boldElem">Department</span> <br>
                                </div>
                                <div class="col">
                                ${user.personal.college} <br>
                                ${user.personal.department} <br>
                                </div>
                            </div>
                        </div>

                        
                        
                        <div class="socialsList">
                            <div class="row">
                                <div class="col">
                                    <span class="boldElem">Email</span> <br>
                                    ${user.email}
                                    <hr>
                                    <span class="boldElem">Phone</span> <br>
                                    ${user.social.phone} 
                                    <hr>
                                    <span class="boldElem">LinkedIn</span> <br>
                                    <a href="${user.social.linkedin}" target="_blank">View Profile</a> 
                                    <hr>
                                    <span class="boldElem">Github</span> <br>
                                    <a href="${user.social.github}" target="_blank">View Profile</a>
                                </div>
                            </div>
                        </div>

                        <div class="bio">
                            <h5>Bio :</h5>
                            ${user.optionals.introduction}
                        </div>
                        <br><vr>
                        <div id = "promote">

                        </div>
                    </div>
                </div>
            </div>
            
            <!--<div class="col-12 col-md-8" style="padding: 0;">
                <div class="rightSideWrapper">
                    <div class="skillsRight">
                        <div class="skillCard">
                            <h5>Primary Skill</h5>
                        </div>

                        <div class="skillCard">
                            <h5>Secondary Skill</h5>
                        </div>

                        <div class="skillCard">
                            <h5>Other Skills</h5>
                        </div>

                        <div class="skillCard">
                        <h5>Project Links</h5>
                        </div>

                        <div class="skillCard">
                            <h5>CGPA</h5>
                        </div>

                        <div class="skillCard">
                            <h5>Languages</h5>
                            ${user.optionals.languages_known}
                        </div>
                        <div id = "promote">

                        </div>
                    </div>
                </div>      
            </div>-->
        </div>
        `)
        if(role=="student" && currentUser==user.email){
            $("#deleteBtn").append(`
            <button type="button" class="card-button btn-danger" onclick=deleteProfile("${user._id}")> 
            Delete   
            </button> 
          `)
          $("#admin").append(`Manage Your Profile`)
        } else if (role == "superuser"){
            $("#deleteBtn").append(`
            <button type="button" class="card-button btn-danger" onclick=deleteProfile("${user._id}")> 
            Delete   
            </button> 
          `)
          $("#admin").append(`You are a Super-User`)
          $("#promote").append(`
          <button onclick=promoteUser("${user._id}") class = "btn btn-primary btn-lg">Demote To User</button>
          `) 
        }
    })
})