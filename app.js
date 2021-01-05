let getHttpRequest = function () {
    var httpRequest = false;
  
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
      httpRequest = new XMLHttpRequest();
      if (httpRequest.overrideMimeType) {
        httpRequest.overrideMimeType('text/xml');
      }
    }
    else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch (e) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {}
      }
    }
  
    if (!httpRequest) {
      alert('Abandon :( Impossible de créer une instance XMLHTTP');
      return false;
    }
  
    return httpRequest
}

let content = document.getElementById("content")

let contactLink = document.getElementById("linkContact")
let accueilLink = document.getElementById("linkAccueil")
let formLink = document.getElementById("linkForm")


formLink.addEventListener('click', function (e) {
  e.preventDefault()
  content.innerHTML = ''
  let formPost = document.createElement('form')
  formPost.setAttribute('name', 'formPost')
  content.appendChild(formPost)

  let postMail = document.createElement('input')
  postMail.setAttribute('name', 'mail')
  postMail.setAttribute('type', 'mail')
  formPost.appendChild(postMail)

  let postPass = document.createElement('input')
  postPass.setAttribute('name', 'password')
  postPass.setAttribute('type', 'password')
  formPost.appendChild(postPass)

  let postButton = document.createElement('button')
  postButton.innerHTML = "Valider"
  formPost.appendChild(postButton)

  postButton.addEventListener('click', function (e) { 
    e.preventDefault()
    let loginForm = document.forms['formPost']
    let mailSaisi = loginForm.elements[0]
    let passSaisi = loginForm.elements[1]  
    let httpRequest = getHttpRequest()
    httpRequest.open('POST','index.html',true)
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
      mail: mailSaisi['value'],
      password: passSaisi['value'],
      userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
  })

  
})


accueilLink.addEventListener('click', function (e) {
  e.preventDefault()
  content.innerHTML = "Vous êtes bien sur la page d'accueil poto"
})


contactLink.addEventListener('click', function (e) {
  content.innerHTML = ''
  e.preventDefault()
  let httpRequest = getHttpRequest()

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4){
        let donnees = JSON.parse(httpRequest.responseText)
        let listeDonnee = document.createElement('ul');
        listeDonnee.setAttribute('id', 'listeDonnees')
        content.appendChild(listeDonnee)
        for(let i = 0; i < donnees.length ; i++){
          let donnee = donnees[i]
          let listeDonneeItem = document.createElement('li');
          listeDonneeItem.setAttribute('id', 'listeDonneesItem')
          listeDonnee.appendChild(listeDonneeItem)
          let parNom = document.createElement('p')
          parNom.setAttribute('id','name')
          listeDonneeItem.appendChild(parNom)

          parNom.innerHTML = "Nom: " + donnee.name

          let parPseudo = document.createElement('p')
          parPseudo.setAttribute('id','pseudo')
          listeDonneeItem.appendChild(parPseudo)

          parPseudo.innerHTML = "Pseudo: " + donnee.username

          let parMail = document.createElement('p')
          parMail.setAttribute('id','pseudo')
          listeDonneeItem.appendChild(parMail)

          parMail.innerHTML = "Email: " + donnee.email
          
         


        }
    }
  }
httpRequest.open('GET', 'https://jsonplaceholder.typicode.com/users', true)
httpRequest.send()
})
