function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2){
    var cookie = parts.pop().split(';').shift();
    return cookie.substring(1, cookie.length-1)
  }   
}

var accessToken = getCookie("access_token")
var role = getCookie("role")

async function getData() {
    var accessToken = getCookie("access_token")
    let request = await fetch("https://skboard.herokuapp.com/api/unverified/all",{
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
    .then(data => {
        data.docs.forEach(student => {  
          // console.log(student.skills)
            $('#cards-container').append(`
            <div class="container-fluid round-border border" id="i-container">
              <div class="row cardPadding">
                <div class="col sm-12 column-border">
                  <img alt="Profile" class="i-img" src="https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png"/>  
                </div>
                <div class="col sm-12 cardTextCenter student">
                  <div>
                    <h4>${student.personal.name}</h4>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span><br>
                    <span>${student.personal.year}</span><br>
                    <span>${student.personal.department}</span>
                  </div>
                </div>
                <div class="mobile"></div>
                <div class="col sm-12 cardTextCenter">
                  <span class="tsSkill">TOP SKILLS</span>
                  <h4>${student.skills.primaryskill}</h4>
                  <a style="font-size: small;">PROJECT LINK</a>
                </div>
                <div class="col sm-12 cardTextCenter">
                  <span class="tsSkill">SECONDARY SKILL</span>
                  <h4>${student.skills.secondaryskill}</h4>
                  <a style="font-size: small;">PROJECT LINK</a>
                </div>
                <div class="mobile"></div>
                <div class="col sm-12 i-icon cardTextCenter">  
                  <ion-icon name="logo-github" style="transform:scale(2);"></ion-icon>
                  <ion-icon name="logo-linkedin" style="transform: scale(2);"></ion-icon>
                  <ion-icon name="logo-whatsapp" style="transform: scale(2);"></ion-icon>
                </div>
                <div class="col sm-6 align-self-center mx-auto"> 
                <a href="./viewUnverified.html?${student._id}">
                <button type="button" class="card-button" style="margin-bottom: 5px"> 
                    &nbsp;View Profile
                </button>
                </a>
                <button type="button" class="card-button btn-success" onclick=verifyProfile("${student._id}")> 
                    Verify Profile   
                </button>
                <br>
                <button type="button" class="card-button btn-danger" onclick=deleteUnverified("${student._id}") style="margin-top: 5px"> 
                  Delete   
                </button>
              </div>
              <div class="mobile"></div> 
            </div>
          </div>
            `)     
    })
})
})