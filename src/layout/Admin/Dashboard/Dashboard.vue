<template>
    <div style="max-height: 110vh;">
        <BieuDo/>
        <v-container>
            <v-row>
                <v-col cols="3" style="height: 100%;">
                    <v-row>
                        <v-col>
                            <DonHangView />
                        </v-col>
                        <v-col>
                            <ChuaDuyetView />
                        </v-col>
                        <v-col>
                            <ChuaDuyetView />
                        </v-col>
                        <v-col>
                            <ChuaDuyetView />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="9" style="height: 100%;">
                    <v-row>
                        <v-col>
                            <v-card>
                                <v-card-title class="text-center">Thông tin đơn hàng chưa duyệt</v-card-title>
                                <v-card-text>
                                    <DonHang />
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red">Duyệt</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card>
                                <v-card-title class="text-center">Thông tin đơn hàng chưa duyệt</v-card-title>
                                <v-card-text>
                                    <DonHang />
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red">Duyệt</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>Thong tin</v-card-title>
                        <v-card-text>
                            <DonHang />
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red">Duyệt</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import DonHangView from '@/layout/Admin/Dashboard/DonHangView.vue'
import DonHang from '@/layout/Admin/Dashboard/DonHang.vue'
import ChuaDuyetView from '@/layout/Admin/Dashboard/DonHangChuaDuyetView.vue'
import BieuDo from '@/layout/Admin/Dashboard/BieuDo.vue'
export default {
    name: 'DashboardView',
    components: {
        DonHangView,
        ChuaDuyetView,
        DonHang,BieuDo
    }
}
</script>

<style scoped>
.v-card {
    background-color: #f5f5f5;
    border-radius: 4px;
}
</style>