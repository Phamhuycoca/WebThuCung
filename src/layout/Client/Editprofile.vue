<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="800">
            <v-card elevation="2">
                <v-card-title>
                    <h2 class="text-center mt-2">Cập nhập thông tin tài khoản</h2>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="update">
                        <v-file-input v-model="image" type="file" accept="image/png, image/jpeg, image/bmp"
                            placeholder="Chọn ảnh" prepend-icon="mdi-camera" label="Hình ảnh"
                            @change="handleImageChange"></v-file-input>
                        <v-text-field v-model="formData.hoVaTen" label="Họ và tên"></v-text-field>
                        <v-text-field v-model="formData.diaChi" label="Địa chỉ"></v-text-field>
                        <v-text-field v-model="formData.sdt" label="Số điện thoại"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="update" color="green">Cập nhập thông tin</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="this.dialog = false" color="red">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import nguoidungApi from '../../service/nguoidungApi';
export default {
    name: 'EditView',
    props: ['currentData'],
    data() {
        return {
            dialog: false,
            formData: {
                nguoiDungId: '',
                nguoiDungHinhAnh: '',
                hoVaTen: '',
                diaChi: '',
                sdt: '',
                email: '',
                password: '',
                quyen: ''
            },
            image:null
        };
    },
    methods: {
        handleImageChange(event) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                this.formData.nguoiDungHinhAnh = selectedFile;
                this.selectedImage = URL.createObjectURL(selectedFile);
            } else {
                this.selectedImage = null;
            }
        },
        openDialog() {
            this.dialog = true;
        },
        async update() {
            try{
                const res =await nguoidungApi.updateUser(this.formData);
                console.log(res.data);
            }catch(error){
                console.log(error.data)
            }
            this.$emit("update")
            this.dialog = false;
        }
    },
    watch: {
        currentData: function () {
            this.formData.nguoiDungId = this.currentData.nguoiDungId,
                this.formData.nguoiDungHinhAnh = this.currentData.nguoiDungHinhAnh,
                this.formData.hoVaTen = this.currentData.hoVaTen,
                this.formData.diaChi = this.currentData.diaChi,
                this.formData.email = this.currentData.email,
                this.formData.password = this.currentData.password,
                this.formData.quyen = this.currentData.quyen,
                this.formData.sdt = this.currentData.sdt
        }

    }
}
</script>

<style></style>