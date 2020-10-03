function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2){
      var cookie = parts.pop().split(';').shift();
      return cookie.substring(1, cookie.length-1)
    }   
  }
  
  console.log(document.cookie)
  async function getData() {
      var accessToken = getCookie("access_token")
      let request = await fetch("https://skboard.herokuapp.com/api/superuser/all", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Authorization":"Bearer "+accessToken
        },
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: body // body data type must match "Content-Type" header
      })
      if(request.status == "200"){
        console.log("Logged In")
      } else{
        window.location.href = "login.html"
      }
      let data = request.json();
      return data
  
  }
  
  $(document).ready(() => {
      var currentUser = getCookie("currentUser")
      var role = getCookie("role")
      if(role=="superuser"){
          $('#dropDown').append(`
          <a href="./unverified.html">
          <button class="btn btn-success btn-block">
            Verify Profiles
          </button>
          </a>
          <a href="./unverified.html">
          <button class="btn btn-success btn-block">
            View SuperUsers
          </button>
          </a>
          <br>
          `)
      }
  
      getData()
      .then(data => {
          data.docs.forEach(superuser => {  
            // console.log(superuser.skills)
            $('#cards-container').append(`
              <div class="container-fluid round-border border" id="i-container">
                <div class="row cardPadding">
                  <div class="col sm-12 column-border">
                    <img alt="Profile" class="i-img" src="https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png"/>  
                  </div>
                  <div class="col sm-12 cardTextCenter student">
                    <div>
                      <h4>${superuser.personal.name}</h4>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star"></span><br>
                    </div>
                  </div>
                  <div class="mobile"></div>
                  <div class="col sm-12 cardTextCenter">
                    
                  </div>
                  <div class="col sm-12 cardTextCenter">
                    
                  </div>
                  <div class="mobile"></div>
                  <div class="col sm-12 i-icon cardTextCenter">  
                    <ion-icon name="logo-github" style="transform:scale(2);"></ion-icon>
                    <ion-icon name="logo-linkedin" style="transform: scale(2);"></ion-icon>
                    <ion-icon name="logo-whatsapp" style="transform: scale(2);"></ion-icon>
                  </div>
                  <div class="col sm-6 align-self-center mx-auto"> 
                  <a href="./viewsuperuser.html?${superuser._id}">
                  <button type="button btn-disabeled" class="card-button")> 
                      View Profile
                  </button>
                  </a>
                  <div id = "deleteBtn">
                    
                  </div>
                </div>
                <div class="mobile"></div> 
              </div>
            </div>
            `)
      })
    })
  })