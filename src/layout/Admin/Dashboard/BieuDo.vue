<template>
    <div>
        <canvas ref="pieChart" width="350" height="350"></canvas>
    </div>
</template>
    
<script>
import dashboardApi from '@/service/dashboardApi';
import Chart from 'chart.js/auto';

export default {
    name: 'BieuDo',
    data() {
        return {
            data: {},
            chartInstance: null,
        };
    },
    mounted() {
        // Khởi tạo biểu đồ khi có dữ liệu
        this.getThongTinDonHang();
    },
    methods: {
        renderPieChart() {
            if (this.chartInstance) {
                this.chartInstance.destroy(); // Hủy biểu đồ trước khi vẽ lại
            }

            const ctx = this.$refs.pieChart.getContext('2d');
            this.chartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Số lượng đơn hàng', 'Đơn hàng', 'Đơn chưa duyệt'],
                    datasets: [
                        {
                            label: 'Dataset 1',
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                            data: [
                                this.data.tongDonhang || 0,
                                this.data.tongDonHangDaDuyet || 0,
                                this.data.tongDonHangChuaDuyet || 0,
                            ],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        },
        async getThongTinDonHang() {
            try {
                const res = await dashboardApi.getThongTinDonHang();
                this.data = res.data;
                this.renderPieChart();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
};
</script>
  