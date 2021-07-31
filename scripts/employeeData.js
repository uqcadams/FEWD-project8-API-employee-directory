// SCRIPTS FOR ACCESSING EMPLOYEE DATA FROM API
const userData = [];
const getUserData = async () => {

    const base = "https://randomuser.me/api/";
    const userCount = 12;
    const query = `?results=${userCount}&inc=picture,name,email,location,cell,dob&nat=AU`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data;
};

getUserData()
    // returns an array of the users with associated data
    .then(data => {
        return data.results;
    })
    .then(data => {
        sortAlphabetically(data);
        storeEmployeeData(data);
        createEmployeeProfile(employeeData);
    })
    .catch(error => console.log(error));


