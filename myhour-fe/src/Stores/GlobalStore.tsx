import {observable, action, computed} from 'mobx';
import {createContext} from 'react';
import axios from 'axios';


class GlobalState {
    @observable userData = {UserID: "" ,employeeID : "",  Firstname: "", Lastname: "", Position: "", branchID: ""};

    @observable loginStatus = false;

    @observable branchData = [];

    @observable currShifts = [];

    @observable currEmployee = {UserID: '', EmployeeID: '', Name: '', Position: ''};

    @action acceptRequest = (DelUserID, ShiftID) => {
        console.log(this.userData.UserID);
        console.log(DelUserID);
        console.log(ShiftID);
        return axios
        .post('https://swapapi.azurewebsites.net/api/AcceptRequest', {AddUserID: this.userData.UserID, DelUserID: DelUserID, ShiftID: ShiftID})
        .then(res => {
            console.log(res); 
        }).catch(err => {
            console.log(err);
        })
    }

    @action getRequestCounts = () => {
        return axios
        .get('https://swapapi.azurewebsites.net/api/GetRequestCounts')
        .then(res => {
            return res.data; 
        }).catch(err => {
            console.log(err);
        })
    }

    @action addRequest = (RequestData) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/AddRequest', {UserID: this.userData.UserID, ShiftID: RequestData.ShiftID, Comment: RequestData.Comment, Urgent: RequestData.Urgent})
        .then(res => {
            console.log(res); 
        }).catch(err => {
            console.log(err);
        })
    }

    @action getRequestsByDay = async(date) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetRequestsByDay', {"shiftDate": date})
        .then(res => {
            return res.data;
        }).catch(err => {
            console.log(err) ;
        })
    }

    @action deleteUser = (ID) => {
        return axios
        .post('https://swapapi.azurewebsites.net/api/DeleteUser', {UserID: ID})
        .then(res => {
            console.log(res); 
        }).catch(err => {
            console.log(err);
        })
    }

    @action addEmployee = async(employee) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/AddUser', {...employee, "branchID": this.userData.branchID})
        .then(res => {
            console.log(res); 
        }).catch(err => {
            console.log(err)
        })
    }

    @action getEmployee = async(ID) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetUser', {"UserID": ID})
        .then(res => {
            this.currEmployee = {...res.data, Name: res.data.Firstname + ' ' + res.data.Lastname};
        }).catch(err => {
            console.log(err);
        })
    }

    @action getBranchData = async() => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetBranchEmployees', {"branchID": this.userData.branchID})
        .then(res => {
            console.log(res.data);
            this.branchData = res.data;       
        }).catch(err => {
            console.log(err);
        })
    }

    @action addShift = async(ID, shiftDate, startTime, endTime) => {
        shiftDate = shiftDate.slice(0, 10);
        startTime =startTime.slice(11, 19);
        endTime = endTime.slice(11, 19);
        return await axios
        .post('https://swapapi.azurewebsites.net/api/AddShift', {"UserID": ID, "shiftDate": shiftDate, "startTime": startTime, "endTime": endTime})
        .then(res => {
            console.log(res.data);     
        }).catch(err => {
            console.log(err);
        })
    }

    @action editShift = async(ShiftID, shiftDate, startTime, endTime) => {
        shiftDate = shiftDate.slice(0, 10);
        startTime =startTime.slice(11, 19);
        endTime = endTime.slice(11, 19);
        console.log(ShiftID)
        console.log(shiftDate)
        console.log(startTime)
        console.log(endTime)
        return await axios
        .put('https://swapapi.azurewebsites.net/api/EditShift', {"ShiftID": ShiftID, "shiftDate": shiftDate, "startTime": startTime, "endTime": endTime})
        .then(res => {
            console.log(res.data);     
        }).catch(err => {
            console.log(err);
        })
    }

    @action deleteShift = async(ShiftID) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/DeleteShift', {"ShiftID": ShiftID})
        .then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err) ;
        })
    }

    @action getShifts = async(ID) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetEmployeeShifts', {"UserID": ID})
        .then(res => {
            if (res.data != null) {
                this.currShifts = res.data;
            }      
        }).catch(err => {
            console.log(err) ;
        })
    }

    @action getShiftsByDay = async(date) => {
        return await axios
        .post('https://swapapi.azurewebsites.net/api/GetShiftsByDay', {"UserID": this.userData.UserID, "Date": date})
        .then(res => {
            return res.data;
        }).catch(err => {
            console.log(err) ;
        })
    }

    //LOGIN ACTIONS
    @action attemptLogin = () => {
        console.log('attempted')
    }

    @action setLoginStatus = (status: boolean) => {
        this.loginStatus = status;
    }
    ///////////////

    @action setUserData = (userInfo: any) => {
        this.userData = userInfo;
    }

    @computed get UserName() {
        return this.userData.Firstname;
    }
}

export const GlobalStateContext = createContext(new GlobalState());