// SCRIPTS FOR DOM MANIPULATION


// Testing area for implementation
const testArea = document.getElementById('testArea');

const getUserData = async () => {

    const base = "https://randomuser.me/api/";
    const query = "?results=12&inc=picture,name,email,location,cell,dob";

    const response = await fetch(base + query);
    const data = await response.json();

    return data;
};

getUserData()
    .then(data => console.log(data))
    .catch(error => console.log(error));