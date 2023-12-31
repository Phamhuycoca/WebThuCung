import axios from "axios";
const nguoidungApi = axios.create({
    baseURL: 'https://localhost:2407/api/NguoiDung'
});
export default {
    async Register(data) {
        return await nguoidungApi.post('/register', data);
    },
    async Login(data) {
        return await nguoidungApi.post('/login', data);
    },
    async Forgot(email) {
        return await nguoidungApi.post('/forgot', email, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    async DeCodeToken(token) {
        return await nguoidungApi.post(`/DecodeToken?token=${token}`);
    },
    async getById(id) {
        return await nguoidungApi.get(`${id}`);
    },
    async updateUser(data) {
        return await nguoidungApi.put('/updateUser', data,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

}