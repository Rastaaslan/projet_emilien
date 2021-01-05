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
contactLink.addEventListener('click', function (e) {
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
