document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const datas = await res.json();
    const body = document.querySelector('body');
    
    datas.forEach(data => {
        const dom = document.createElement('div');
        dom.innerHTML = `
            <h1>${data.title}</h1>
            <p>${data.body}</p>
        `;

        body.append(dom)
    });
});