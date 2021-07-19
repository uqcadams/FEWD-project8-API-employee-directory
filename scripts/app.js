// SCRIPTS FOR DOM MANIPULATION


// Testing area for implementation
const testArea = document.getElementById('testArea');

// Data source:
const userData = "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob";

// Fetch Random User data - parametres grab picture, name, email, location, cellphone data, and date of birth. 

const getUserData = async () => {
    const response = await fetch(userData);
    // delete later
    console.log(`Data before json(): `, response);

    const data = await response.json();
    // delete later
    console.log(`Data after json(): `, data);

    return data;
};

let testData = getUserData()
    .then(data => console.log('Resolved', data));


// fetch(userData)
//     .then(response => {
//         console.log('resolved', response);
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.log('rejected', error);
//     })