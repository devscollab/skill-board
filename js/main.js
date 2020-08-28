// Main javascript file for entire website 

function expandSearch(){
    closeOptions()
    var search = document.getElementById("collapsedSearch")
    search.style.height = ("110px")
    search.style.opacity = ("1")
}

function closeSearch(){
    var search = document.getElementById("collapsedSearch")
    search.style.height = ("0")
    search.style.opacity = ("0")
}

function expandOptions(){
    closeSearch()
    var abc = document.getElementById("collapsedOptions")
    abc.style.height = ("40px")
    abc.style.opacity = ("1")
}

function closeOptions(){
    var abc = document.getElementById("collapsedOptions")
    abc.style.height = ("0")
    abc.style.opacity = ("0")
}