import axios from "axios";
const hoadonApi = axios.create({
    baseURL:'https://localhost:2407/api/HoaDon'
});
export default{
    async checkOut(data){
        return await hoadonApi.post('',data);
    },
    async getById(id){
        return await hoadonApi.get(`${id}`);
    },
    async getChiTietById(id){
        return await hoadonApi.get('/getChiTiet/'+id);
    },
    async huyDon(id){
        return await hoadonApi.delete(`${id}`);
    }
}