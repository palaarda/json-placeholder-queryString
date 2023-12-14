const personParent = document.querySelector('.row');
async function getData() {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonParse = await data.json();
    jsonParse.forEach(person => {
        const id = person.id;
        const personName = person.name;
        const personEmail = person.email;
        const personStreet = person.address.street;
        const personSuite = person.address.suite;
        const personCity = person.address.city;
        const personZipcode = person.address.zipcode;
        const personPhone = person.phone;
        const personWebsite = person.website;
        const personCompany = person.company.name;
        const personCatchphrase = person.company.cathPhrase;
        const personBs = person.company.bs;

        const card = document.createElement('div');
        card.classList.add('col-lg-6')
        card.classList.add('col-xxl-3')
        card.innerHTML = `
                <a href="/json-placeholder-queryString/posts.html?userId=${id}">
                    <div>
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">
                                    <i class="bi bi-person"></i>:&nbsp; <span>${personName}</span> <br>
                                    <i class="bi bi-envelope"></i>:&nbsp; <span>${personEmail}</span> <br>
                                    <i class="bi bi-geo-alt"></i>:&nbsp; <br>
                                    <p>
                                        Street: "${personStreet}", <br>
                                        Suite: "${personSuite}",  <br>
                                        City: "${personCity}",    <br>
                                        Zipcode: "${personZipcode}",  <br>
                                    </p>
                                    <i class="bi bi-telephone"></i>:&nbsp; <span>${personPhone}</span> <br>
                                    <i class="bi bi-browser-chrome"></i>:&nbsp; <span>${personWebsite}</span> <br>
                                    <i class="bi bi-building-fill"></i>:&nbsp; <br>
                                    <p>
                                        Name: "${personCompany}", <br>
                                        CathPhrase: "${personCatchphrase}",  <br>
                                        Bs: "${personBs}",    <br>
                                    </p>
                                </p>
                            </div>
                        </div>
                    </div> 
                    </a>    `
    personParent.appendChild(card);
    });
}
getData();