import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
    withCredentials: true,
});

export const scheduleAPI = {
    getSchedule() {
        return instance.get(`/schedule`);
    },
    updateSchedule(day, subjectID, field, value) {
        return instance.put(`/schedule`, {day, subjectID, field, value});
    }
}

export const personalAreaAPI = {
    getNewUsers() {
        return instance.get(`/new-users`);
    },
    acceptNewUser(id) {
        debugger
        return instance.post(`/new-users`, {id});
    },
    declineNewUser(id) {
        debugger
        return instance.delete(`/new-users`, {data: {id: id}});
    },
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`);
    },
    login(email, password) {
        return instance.post(`auth/login`, {email, password});
    },
    logout() {
        return instance.delete(`auth/login`);
    },
    registration(formData) {
        let {firstName, surname, email, password, role} = formData;
        return instance.post(`auth/registration`, {firstName, surname, email, password, role});
    }
}