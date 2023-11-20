import axios from "axios";
const thunuoiApi=axios.create({
    baseURL:'https://localhost:2407/api/ThuNuoi'
})
export default{
    async getAll(){
        return await thunuoiApi.get();
    },
    async addData(data){
        return await thunuoiApi.post('',data,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
    },
    async updateData(id,data){
        return await thunuoiApi.put(`${id}`,data,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
    },
    async deleteData(id){
        return await thunuoiApi.delete(`${id}`);
    }
}