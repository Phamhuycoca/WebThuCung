import axios from "axios";
const giohangApi = axios.create({
    baseURL: 'https://localhost:2407/api/GioHang'
});
export default {
    async getAllCarts() {
        return await giohangApi.get();
    },
    async addItem(data) {
        return await giohangApi.post('', data);
    },
    async tanggiamCart(data){
        return await giohangApi.put('',data);
    },
    async removeCart(id){
        return await giohangApi.delete(`${id}`);
    }
}