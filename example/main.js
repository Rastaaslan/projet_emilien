// document.addEventListener('DOMContentLoaded', async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const datas = await res.json();
//     const body = document.querySelector('body');
    
//     datas.forEach(data => {
//         const dom = document.createElement('div');
//         dom.innerHTML = `
//             <h1>${data.title}</h1>
//             <p>${data.body}</p>
//         `;

//         body.append(dom)
//     });
// });

document.addEventListener('DOMContentLoaded', async () => {
    
    const body = document.querySelector('body');
    body.innerHTML = '' // Reset de la div de contenu

  // Création de la balise du formulaire
  let formPost = document.createElement('form')
  formPost.setAttribute('name', 'formPost')
  body.appendChild(formPost)

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
    let postForm = async function () {
        let loginForm = document.forms['formPost']

        // Récupération du mail et du mdp saisi
        let mailSaisi = loginForm.elements[0].value
        let passSaisi = loginForm.elements[1].value 

        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              title: mailSaisi,
              body: passSaisi,
              userId: 1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
        let result = await response.json()
        return result
    }

    postForm().then(function (result) {
        console.log(result)
    }).catch(function(e) {
        console.log(e)
    })
  })
})
