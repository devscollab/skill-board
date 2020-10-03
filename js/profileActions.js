function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2){
      var cookie = parts.pop().split(';').shift();
      return cookie.substring(1, cookie.length-1)
    }   
}

var accessToken = getCookie("access_token")

function verifyProfile(user) {
    if(confirm("Are you sure you want to verify this user? They will be added to the listing page.")){
    const url = "https://skboard.herokuapp.com/api/unverified/approve/"+user
    console.log(url) 
    fetch(url, { 
        method: "POST", 
        body: null,
        headers: { 
            "Authorization":"Bearer "+accessToken
        } 
    }) 
    .then(response => response.json()) 
    .then(json => console.log(json));
    alert("verified " +user);
    location.reload()
    }
    
}

function deleteProfile(user){
    if(confirm("Are you sure you want to delete this account from SkillBoard? This action cannot be undone.")){
    const url = "https://skboard.herokuapp.com/api/student/delete/" +user
    console.log(url) 
    fetch(url, { 
        method: "DELETE", 
        body: null,
        headers: { 
            "Authorization":"Bearer "+accessToken
        } 
    }) 
    .then(response => response.json()) 
    .then(json => console.log(json));
    alert("deleted " +user);
    window.location.href = "index.html"
    }
}

function deleteUnverified(user){
    if(confirm("Are you sure you want to verify this user? They will be added to the listing page.")){
    const url = "https://skboard.herokuapp.com/api/unverified/delete/" +user
    console.log(url) 
    fetch(url, { 
        method: "DELETE", 
        body: null,
        headers: { 
            "Authorization":"Bearer "+accessToken
        } 
    }) 
    .then(response => response.json()) 
    .then(json => console.log(json));
    alert("deleted " +user);
    location.reload()
    }
}

function promoteUser(user){
    if(confirm("Are you sure you want to promote this user to SuperUser? Doing so will give the admin access to SkillBoard.")){
        const url = "https://skboard.herokuapp.com/api/superuser/promote/" + user
        console.log(url)
        fetch(url, {
            method: "POST",
            body: null,
            headers : {
                "Authorization":"Bearer "+accessToken
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
        alert("This user has been promoted to Super User")
        window.location.href = "index.html"
    }  
}


