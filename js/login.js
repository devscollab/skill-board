// Function to post data

async function postData(url , data) {
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
    if(response.status == "200"){
      swal("Good job!", "Login Succesful!!", "success");
      //alert("Login Succesful!")
      window.location.href = "index.html"
    } else{
      alert("Something went wrong. Try Again!")
    }
    return response.json(); // parses JSON response into native JavaScript objects
  }

const registrationform = document.getElementById("loginform")


// Handle form events such as onsubmit
// Event listner
registrationform.addEventListener('submit', async  function(e) {
    e.preventDefault();
    const use1r = new FormData(this);
    // Object To be posted
    var user = {
        "email" : this.email.value,
        "password" : this.pass.value,
    };
   let url = "https://skboard.herokuapp.com/api/login/"; // URL for skboard api
    const res = await postData(url, user); // Post function
    console.log("Response =>" + JSON.stringify(res));   // Log the response  
    var token = JSON.stringify(res.token)
    var role = JSON.stringify(res.role)
    document.cookie = "access_token=" + token
    document.cookie="role=" + role
    document.cookie = "currentUser=" + `"` + this.email.value +  `"`
})