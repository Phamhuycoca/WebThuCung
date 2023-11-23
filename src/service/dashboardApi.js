import axios from 'axios'
const dashboardApi=axios.create({
    baseURL:'https://localhost:2407/api/Dashboard'
});
export default{
    async getThongKe(){
        return await dashboardApi.get('/ThongKe');
    },
    async getThongTinDonHang(){
        return await dashboardApi.get('/ThongTinDonHang');
    },
    async getThongKeDoanhThu(){
        return await dashboardApi.get('/DoanhThuThang')
    }
}