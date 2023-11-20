<template>
    <div>
        <v-dialog v-model="dialogAction" max-width="500px">
            <v-card>
                <v-card-title class="text-center">
                    <span>{{ !currentData ? "Thêm mới thông tin" : "Cập nhập thông tin" }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Nhập tên danh mục" v-model="formData.danhMucTen">
                                    </v-text-field>
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
                danhMucId: '',
                danhMucTen: ''
            },
            dialogloading: false,
            showAlert: {
                show: false,
                icon: "$success",
                content: "",
                color: "success"
            }
        }
    },
    watch: {
        currentData: function () {
            this.formData.danhMucId = this.currentData.danhMucId;
            this.formData.danhMucTen = this.currentData.danhMucTen;
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
        reSetForm() {
            this.formData.danhMucId = '';
            this.formData.danhMucTen = '';
        },
        async updateData() {
            this.dialogloading = true;
            try {
                if (this.formData.danhMucId === '') {
                    this.formData.danhMucId = 0;
                    const res = await danhmucApi.addData(this.formData);
                    console.log(res.data);
                    this.dialogloading = false;
                    this.AlertSuccess('Thêm mới thông tin thành công');
                } else {
                    const res = await danhmucApi.updateData(this.formData.danhMucId, this.formData);
                    console.log(res.data);
                    this.dialogloading = false;
                    this.AlertSuccess('Cập nhập thông tin thành công');
                }
            } catch (error) {
                console.log(error);
                this.AlertError('Thao tác không thể thực hiện');
            }
            this.$emit('close');
            this.$emit('updateData');
            this.reSetForm();
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

    }
}
</script>

<style></style>