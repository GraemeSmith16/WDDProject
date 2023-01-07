var btn = document.getElementById('btn')
btn.addEventListener('click', changeContact)
var login = document.getElementsByClassName('btn btn-primary btn-block mb-4')
login.addEventListener('click', changeNav)

function changeContact() {
    var div = document.createElement('div')
    var text = document.createElement('p')
    var form = document.getElementById('form')

    text.innerHTML=("You have submitted your query! Our team will get back to you in the coming days!")
    div.appendChild(text)
    body.appendChild(div)

}

function changeNav() {
    navItem = document.getElementsByClassName('nav-items')[4]
    navItem.innerText = "Logged in"
}

