import axios from "axios";
const sanphamApi = axios.create({
    baseURL: 'https://localhost:2407/api/SanPham'
});
export default {
    async getAll() {
        return await sanphamApi.get()
    },
    async addData(data) {
        return await sanphamApi.post('', data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    async updateData(id, data) {
        return await sanphamApi.put(`${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    async deleteData(id) {
        return await sanphamApi.delete(`${id}`)
    },
    async getById(id){
        return await sanphamApi.get(`${id}`)

    }
}