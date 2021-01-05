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
 // Récupération de la div qui contiendra ma paeg
let content = document.getElementById("content")

// Récupération des différents boutons du menu
let contactLink = document.getElementById("linkContact")
let accueilLink = document.getElementById("linkAccueil")
let formLink = document.getElementById("linkForm")

// Gestion de la page 'formulaire'
formLink.addEventListener('click', function (e) {
  e.preventDefault()
  content.innerHTML = '' // Reset de la div de contenu

  // Création de la balise du formulaire
  let formPost = document.createElement('form')
  formPost.setAttribute('name', 'formPost')
  content.appendChild(formPost)

  // Ajout du champ adresse mail
  let postMail = document.createElement('input')
  postMail.setAttribute('name', 'mail')
  postMail.setAttribute('type', 'mail')
  formPost.appendChild(postMail)

  // Ajout du champ mot de passe
  let postPass = document.createElement('input')
  postPass.setAttribute('name', 'password')
  postPass.setAttribute('type', 'password')
  formPost.appendChild(postPass)

  // Ajout du bouton de validation
  let postButton = document.createElement('button')
  postButton.innerHTML = "Valider"
  formPost.appendChild(postButton)

  // Action du bouton de validation
  postButton.addEventListener('click', function (e) { 
    e.preventDefault()
    // Création du httpRequest
    let httpRequest = getHttpRequest()
    

    // REMARQUE : Si je mets tout le reste du code de ce listener dans httpRequest.onreadystatechange = function () {  if (httpRequest.readyState === 4){ ca ne fonctionne plus pourquoi?


    // Récupération des différents formulaires de la page
    let loginForm = document.forms['formPost']

    // Récupération du mail et du mdp saisi
    let mailSaisi = loginForm.elements[0].value
    let passSaisi = loginForm.elements[1].value 
    // Ouverture de l'httpRequest
    httpRequest.open('POST','index.html',true)

    // Fetch des valeurs
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        mail: mailSaisi,
        password: passSaisi,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    // Affichage de la réponse du serveur
    .then((response) => response.json())
    .then((json) => console.log(json));   
  })  
})

// Retour sur l'accueil
accueilLink.addEventListener('click', function (e) {
  e.preventDefault()
  content.innerHTML = "Vous êtes bien sur la page d'accueil poto"
})

// Affichage de la page de contacts
contactLink.addEventListener('click', function (e) {
  // Vidage du contenu
  content.innerHTML = ''
  e.preventDefault()

  // Création HttpRequest
  let httpRequest = getHttpRequest()

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4){
        // Récupération des données sous forme de table à partir d'un json
        let donnees = JSON.parse(httpRequest.responseText)
        // Création d'une liste non ordonnée
        let listeDonnee = document.createElement('ul');
        listeDonnee.setAttribute('id', 'listeDonnees')
        content.appendChild(listeDonnee)

        // Parcours de la liste de données
        for(let i = 0; i < donnees.length ; i++){
          // Récupération d'un élément
          let donnee = donnees[i]

          //Création d'un item de liste pour l'élément
          let listeDonneeItem = document.createElement('li');
          listeDonneeItem.setAttribute('id', 'listeDonneesItem')
          listeDonnee.appendChild(listeDonneeItem)

          // Ajout d'un paragraphe pour le nom
          let parNom = document.createElement('p')
          parNom.setAttribute('id','name')
          listeDonneeItem.appendChild(parNom)

          parNom.innerHTML = "Nom: " + donnee.name

          // Ajout d'un paragraphe pour le pseudo
          let parPseudo = document.createElement('p')
          parPseudo.setAttribute('id','pseudo')
          listeDonneeItem.appendChild(parPseudo)

          parPseudo.innerHTML = "Pseudo: " + donnee.username

          // Ajout d'un paragraphe pour le mail
          let parMail = document.createElement('p')
          parMail.setAttribute('id','pseudo')
          listeDonneeItem.appendChild(parMail)

          parMail.innerHTML = "Email: " + donnee.email

        }
    }
  }
// Récupération des données a partir de jsonplaceholder
httpRequest.open('GET', 'https://jsonplaceholder.typicode.com/users', true)
httpRequest.send()
})
