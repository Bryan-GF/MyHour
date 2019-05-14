import axios from 'axios';

export const VerifyToken = async(state, setLoading) => {
    const token = localStorage.getItem('Token');
    if(token) {
        return axios
        .post('https://swapapi.azurewebsites.net/api/VerifyToken', {"token": token})
        .then(async(res) => {
            console.log("Success")
            let json = JSON.parse(res.data);
            let User = {"employeeID": json.employeeID, "Firstname": json.Firstname, "Lastname": json.Lastname, "Position": json.Position}
            state.setUserData(User);
            state.setLoginStatus(true);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }
}