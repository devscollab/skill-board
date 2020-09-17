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
    })
})