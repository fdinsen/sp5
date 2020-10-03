import 'bootstrap/dist/css/bootstrap.css'

const tb = document.getElementById('tb');
const url = 'http://localhost:3333/api/users';
document.getElementById("getUserButton").addEventListener("click", getUserById);
document.getElementById("addUserButton").addEventListener("click", addUser);
document.getElementById("editUserButton").addEventListener("click", editUser);
document.getElementById("deleteUserButton").addEventListener("click", deleteUser);
getAllUsers();

function getAllUsers() {
    fetch(url)
    .then(res=>fetchWithErrorCheck(res))
    .then((data)=>{
        const trs = data.map((user)=>{
            return `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.age}</td><td>${user.gender}</td><td>${user.email}</td></tr>`;
        });
        const trStr = trs.join('');
        tb.innerHTML = trStr;
    });
}




function getUserById() {
    const table = `<thead><tr><th>ID</th><th>NAME</th><th>AGE</th><th>GENDER</th><th>EMAIL</th></tr></thead>
                <tbody>`;
    const tableClose = `</tbody>`;
    const singleUserTable = document.getElementById("singleUserTable");
    const idField = document.getElementById("userId");
    fetch(url + `/${idField.value}`)
        .then(res => fetchWithErrorCheck(res))
        .then((user) => {
            const ts = `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.age}</td><td>${user.gender}</td><td>${user.email}</td></tr>`;
            const tableStr = table + ts + tableClose;
            singleUserTable.innerHTML = tableStr;
        }).catch(exception => {
            singleUserTable.innerHTML = "Error, user not found";
        })
        
}

function addUser() {
    const name = document.getElementById("name").value;
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    let options = {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          age: age,
          gender: gender,
          email: email
        })
     }
    fetch(url, options)
        .then(res => fetchWithErrorCheck(res))
        .then(data => {
            getAllUsers();
        })
        .catch(exception => {
            showError(exception);
        });
}

function editUser() {
    const id = document.getElementById("eid").value;
    const name = document.getElementById("ename").value;
    const gender = document.getElementById("egender").value;
    const age = document.getElementById("eage").value;
    const email = document.getElementById("eemail").value;
    let options = {
        method: "PUT",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          age: age,
          gender: gender,
          email: email
        })
     }
    fetch(url + `/${id}`, options)
        .then(res => fetchWithErrorCheck(res))
        .then(data => {
            console.log(data);
            getAllUsers();
        })
        .catch(exception => {
            showError(exception);
        });
}

function deleteUser() {
    const id = document.getElementById("did").value;
    let options = {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json'
        }
     }
     fetch(url + `/${id}`,options).then(res => fetchWithErrorCheck)
     .then(data =>{
         getAllUsers();
     }) 
     .catch(exception => {
         showError(exception);
     })
     
}

function fetchWithErrorCheck(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
}

function showError(error) {
    const errorField = document.getElementById("error");
    errorField.innerHTML = `<p>Error: ${error}</p>`;
}