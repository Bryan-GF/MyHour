import axios from 'axios';

export const VerifyToken = async(state, setLoading, token) => {   
    return axios
    .post('https://swapapi.azurewebsites.net/api/VerifyToken', {"token": token})
    .then(async(res) => {
        if(res.data) {
            let json = JSON.parse(res.data);
            let User = {"UserID": json.UserID, "email": json.email, "Firstname": json.Firstname, "Lastname": json.Lastname, "Position": json.Position, "CompanyID": json.CompanyID, "branchID": json.branchID, "roles": json.roles}
            state.setUserData(User);
            state.setLoginStatus(true);
        }
        setLoading(false);
    }).catch(err => {
        state.setLoginStatus(false);
        localStorage.removeItem("Token");
        setLoading(false);
    })
}