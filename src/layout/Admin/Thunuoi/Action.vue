<template>
    <div>
        <v-dialog v-model="dialogAction" max-width="1024">
            <v-card>
                <v-card-title class="text-center">
                    <span>{{ !currentData ? "Thêm mới thông tin" : "Cập nhập thông tin" }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-file-input v-model="image" type="file" accept="image/png, image/jpeg, image/bmp"
                                        placeholder="Chọn ảnh" prepend-icon="mdi-camera" label="Hình ảnh"
                                        @change="handleImageChange"></v-file-input>
                                    <img v-if="selectedImage" :src="selectedImage" style="width: 200px; height: 200px;"
                                        alt="1" />
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field label="Thú nuôi" v-model="formData.ThuNuoiTen"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field label="Giá bán" v-model="formData.ThuNuoiGia"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field label="Màu lông" v-model="formData.MauLong"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="formData.DanhMucId" :items="this.danhmucs" item-title="danhMucTen"
                                        item-value="danhMucId" label="Thuộc danh mục"></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="green" @click="updateData">
                        Lưu
                    </v-btn>
                    <v-spacer>
                    </v-spacer>
                    <v-btn color="red" @click="$emit('close'), reSetForm">
                        Hủy
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Loading v-model="dialogloading" />
        <Toast style="z-index: 1000;" v-model="showAlert.show" :content="showAlert.content" :color="showAlert.color"
            :icon="showAlert.icon" />
    </div>
</template>
  

<script>
import danhmucApi from '@/service/danhmucApi';
import Toast from '@/components/Toast.vue';
import Loading from '@/components/Loading.vue'
import thunuoiApi from '@/service/thunuoiApi';
export default {
    name: 'ActionView',
    props: ['dialog', 'currentData'],
    components: {
        Loading,
        Toast
    },
    computed: {
        dialogAction: {
            get() {
                return this.dialog;
            },
            set(value) {
                if (!value) {
                    this.$emit('close');
                }
            }
        }
    },
    data() {
        return {
            formData: {
                ThuNuoiId: '',
                ThuNuoiTen: '',
                ThuNuoiHinhAnh: '',
                ThuNuoiGia: '',
                MauLong: '',
                DanhMucId: '',
            },
            dialogloading: false,
            showAlert: {
                show: false,
                icon: "$success",
                content: "",
                color: "success"
            },
            selectedImage: null,
            image: null,
            danhmucs: []
        }
    },
    watch: {
        currentData: function () {
            this.formData.ThuNuoiId = this.currentData.thuNuoiId;
            this.formData.ThuNuoiTen = this.currentData.thuNuoiTen;
            this.formData.ThuNuoiHinhAnh = this.currentData.thuNuoiHinhAnh;
            this.formData.ThuNuoiGia = this.currentData.thuNuoiGia;
            this.formData.MauLong = this.currentData.mauLong;
            this.formData.DanhMucId = this.currentData.danhMucId;
        },
        showAlert: {
            deep: true,
            handler(newVal) {
                if (!newVal.show) return;
                setTimeout(() => (this.showAlert.show = false), 2000);
            }
        }
    },
    methods: {
        handleImageChange(event) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                this.image = selectedFile;
                this.selectedImage = URL.createObjectURL(selectedFile);
            } else {
                this.image = null;
                this.selectedImage = null;
            }
        },
        reSetForm() {
            this.formData.ThuNuoiId='';
            this.formData.DanhMucId = '';
            this.formData.ThuNuoiTen = '';
            this.formData.ThuNuoiHinhAnh = '';
            this.formData.ThuNuoiGia= '';
            this.formData.MauLong = '';
            this.selectedImage= null
        },
        async updateData() {
            this.dialogloading = true;
            try {
                if (this.formData.ThuNuoiId === '') {
                    this.formData.ThuNuoiId = 0;
                    this.formData.ThuNuoiHinhAnh=this.image;
                    const res = await thunuoiApi.addData(this.formData);
                    console.log(res.data);
                    this.dialogloading = false;
                    this.AlertSuccess('Thêm mới thông tin thành công');
                } else {
                    this.formData.ThuNuoiHinhAnh=this.image;
                    const res = await thunuoiApi.updateData(this.formData.ThuNuoiId, this.formData);
                    console.log(res.data);
                    this.dialogloading = false;
                    this.AlertSuccess('Cập nhập thông tin thành công');
                }
            } catch (error) {
                console.log(error);
                this.dialogloading = false;                
                this.AlertError('Thao tác không thể thực hiện');
            }
            this.$emit('close');
            this.$emit('updateData');
            this.reSetForm();
        },
        async getDanhMuc() {
            try {
                const res = await danhmucApi.getAll();
                this.danhmucs = res.data;
                console.log(this.danhmucs);
            } catch (error) {
                console.log(error);
            }
        },
        AlertSuccess(content) {
            this.showAlert.show = true;
            this.showAlert.icon = "$success";
            this.showAlert.content = content;
            this.showAlert.color = "success";
        },
        AlertError(content) {
            this.showAlert.show = true;
            this.showAlert.content = content;
            this.showAlert.icon = "$error";
            this.showAlert.color = "error";
        }
    },
    created() {
        this.getDanhMuc();
    }
}
</script>

<style></style>