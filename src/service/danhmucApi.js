import axios from "axios";
const danhmucAPI = axios.create({
    baseURL: 'https://localhost:2407/api/DanhMuc'
});
export default {
    async getAll() {
        return await danhmucAPI.get();
    },
    async addData(data) {
        return await danhmucAPI.post('', data);
    },
    async updateData(id, data) {
        return await danhmucAPI.put(`${id}`, data)
    },
    async deleteData(id){
        return await danhmucAPI.delete(`${id}`)
    }
}