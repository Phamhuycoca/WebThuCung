<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title class="primary white--text text-center">
                <span class="headline">Đổi mật khẩu</span>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="data.password" label="Nhập mật khẩu mới"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="Change">Đổi mật khẩu</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="closeDialog" color="red">Hủy</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            data: {
                nguoiDungId: '',
                nguoiDungHinhAnh: '',
                hoVaTen: '',
                email: '',
                diaChi: '',
                sdt: '',
                quyen: '',
                password: ''
            }
        };
    },
    props: ['dialogEdit', 'current'],
    computed: {
        dialog: {
            get() {
                return this.dialogEdit;
            },
            set(value) {
                if (!value) {
                    this.$emit('close');
                }
            }
        }
    },
    watch: {
        current : function () {
            this.data.nguoiDungId = this.item.nguoiDungId;
            this.data.nguoiDungHinhAnh = this.item.nguoiDungHinhAnh;
            this.data.email = this.item.email;
            this.data.hoVaTen = this.item.hoVaTen;
            this.data.diaChi = this.item.diaChi;
            this.data.sdt = this.item.sdt;
            this.data.quyen = this.item.quyen;
            this.data.password = this.item.password;
        }
    },
    methods: {
        closeDialog() {
            this.$emit('close');
        },
        Change() {
            axios.put('https://localhost:7125/api/NguoiDung/updateUser/' + this.data.NguoiDungId, this.data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(res => {
                    console.log(res.data);
                    alert("Đổi mật khẩu thành công");
                    this.$emit('close');

                }).catch(error => {
                    console.log(error);
                })
        }
    }
};
</script>
  
<style scoped>
/* Thêm CSS tùy chỉnh cho dialog đặt hàng */
</style>
  