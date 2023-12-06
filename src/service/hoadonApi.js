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
    },
    async duyetDonHang(data){
        return await hoadonApi.post('/DuyetDonHang',data);
    },
    async getDonHangChuaDuyet(){
        return await hoadonApi.get('/GetDonHangChuaDuyet');
    },
    async getDonHangDaDuyet(){
        return await hoadonApi.get('/GetDonHangDaDuyet');
    },
    async getDonHangDangGiao(){
        return await hoadonApi.get('/GetDonHangDangGiao');
    },
    async getDonHangDaGiao(){
        return await hoadonApi.get('/GetDonHangDaGiao');
    },
    async DaNhan(id){
        return await hoadonApi.put('/'+id);
    }
}