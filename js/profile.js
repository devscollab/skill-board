async function getData() {
    query = window.location.search
    user = query.substring(1)
    url = "https://skboard.herokuapp.com/api/student/" +user 
    console.log(url)
    let request = await fetch(url)
    let data = request.json();
    return data
}


$(document).ready(() => {
    getData()
    .then(data =>{
        user = data.docs
        console.log(user)
        $("#profile").append(`
        <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-4 leftSide">
                <div class="leftSideWrapper">
                    <img class="profileImg" src="https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png"/>
                    <div class="centerElem">
                        <h2>${user.personal.name}</h2>
                        <a href ="${user.social.resume}">
                        <button class="btn" style="margin-top: 5px; background-color: rgb(0, 255, 64); padding: 10px 20px;">
                            Download Full Resume
                        </button>
                        </a>
                    </div>

                    <div class="socialsList" style="margin: 60px 0;">
                        <div class="row">
                            <div class="col">
                                <span class="boldElem">College</span> <br>
                                <span class="boldElem">Department</span> <br>
                                <span class="boldElem">Year</span> <br>
                                <span class="boldElem">Division</span> <br>
                                <span class="boldElem">Roll No.</span> <br>
                            </div>
                            <div class="col">
                            ${user.personal.college} <br>
                            ${user.personal.department} <br>
                            ${user.personal.year} <br>
                            ${user.personal.division} <br>
                            ${user.personal.rollno}
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
                                <a href="${user.social.linkedin}">View Profile</a> 
                                <hr>
                                <span class="boldElem">Github</span> <br>
                                <a href="${user.social.github}">View Profile</a>
                            </div>
                        </div>
                    </div>

                    <div class="bio">
                        <h5>Bio :</h5>
                        ${user.optionals.introduction}
                    </div>

                </div>
            </div>
            
            <div class="col-12 col-md-8" style="padding: 0;">
                <div class="rightSideWrapper">
                    <div class="skillsRight">
                        <div class="skillCard">
                            <h5>Primary Skill</h5>
                            ${user.skills.primaryskill}
                        </div>

                        <div class="skillCard">
                            <h5>Secondary Skill</h5>
                            ${user.skills.secondaryskill}
                        </div>

                        <div class="skillCard">
                            <h5>Other Skills</h5>
                            ${user.skills.skill}
                        </div>

                        <div class="skillCard">
                        <h5>Project Links</h5>
                        <a href ="${user.skills.projectsforskills}">Link</a>
                        </div>

                        <div class="skillCard">
                            <h5>CGPA</h5>
                            ${user.skills.cgpa}
                        </div>

                        <div class="skillCard">
                            <h5>Languages</h5>
                            ${user.optionals.languages_known}
                        </div>

                    </div>
                </div>      
            </div>
        </div>
        `)
    })
})