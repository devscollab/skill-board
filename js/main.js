// Main javascript file for entire website 

function expandSearch(){
    closeOptions()
    var search = document.getElementById("collapsedSearch")
    search.style.display=("block")
    search.style.height = ("110px")
    search.style.opacity = ("1")
}

function closeSearch(){
    var search = document.getElementById("collapsedSearch")
    search.style.display=("none")
    search.style.height = ("0")
    search.style.opacity = ("0")
}

function expandOptions(){
    closeSearch()
    var options = document.getElementById("collapsedOptions")
    options.style.display=("flex")
    options.style.height = ("40px")
    options.style.opacity = ("1")
}

function closeOptions(){
    var options = document.getElementById("collapsedOptions")
    options.style.display=("none")
    options.style.height = ("0")
    options.style.opacity = ("0")
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2){
      var cookie = parts.pop().split(';').shift();
      return cookie.substring(1, cookie.length-1)
    }   
  }


function logout(){
    document.cookie = "access_token=NONE"
    window.location.href = "login.html"
}