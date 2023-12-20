const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('userId');

console.log(id);

const personParent = document.querySelector('.row');
async function getPersonData(){
    const personData = await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + id);
    const datajson = await personData.json();
    
    datajson.forEach(data => {
        const card = document.createElement('div');
        console.log(data.title);
        card.classList.add('col-lg-12')
        card.innerHTML = `
            <div>
                <div class="card">
                    <div class="card-body">
                        <p class="card-text">
                            <i class="bi bi-person"></i>:&nbsp; <span>${data.title[0].toUpperCase() + data.title.slice(1)}</span> <br>
                            <p class="history">
                                Criminal History: <span>${data.body[0].toUpperCase() + data.body.slice(1)}</span>
                            </p>
                        </p>
                    </div>
                </div>
            </div>    `
    personParent.appendChild(card);
    });
    if (id > 10 || id <= 0 || id == null){
        alert("Böyle Bir Kullanıcı Yok!");
        const manuelId= parseInt(prompt("Lütfen İd yi Doğru Belirtin."));
        window.location.href = 'posts.html?userId=' + manuelId;
    }
}
getPersonData()