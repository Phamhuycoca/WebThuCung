<template>
    <div>
        <canvas ref="revenueChart" width="350" height="350"></canvas>
    </div>
</template>
  
<script>
import Chart from 'chart.js/auto';
import dashboardApi from '../../../service/dashboardApi';

export default {
    name: "DanhThu",
    data() {
        return {
            doanhthu: []
        }
    },
    mounted() {
        this.getDoanhThuTheoThang();
    },
    methods: {
        async getDoanhThuTheoThang() {
            const res = await dashboardApi.getThongKeDoanhThu();
            this.doanhthu = res.data;
            console.log(this.doanhthu);
            this.renderRevenueChart();
        },
        // renderRevenueChart() {
        //     const ctx = this.$refs.revenueChart.getContext('2d');
        //     new Chart(ctx, {
        //         type: 'line',
        //         data: {
        //             //labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
        //             labels: this.doanhthu.thang,
        //             datasets: [
        //                 {
        //                     label: 'Doanh thu theo tháng',
        //                     borderColor: 'rgb(75, 192, 192)',
        //                     data: [this.doanhthu.tongDoanhThu],
        //                     fill: false,
        //                 },
        //             ],
        //         },
        //         options: {
        //             responsive: true,
        //             maintainAspectRatio: false,
        //             scales: {
        //                 y: {
        //                     beginAtZero: true,
        //                 },
        //             },
        //         },
        //     });
        // },
        renderRevenueChart() {
    const ctx = this.$refs.revenueChart.getContext('2d');

    const labels = this.doanhthu.map(item => item.thang); // Lấy tên các tháng thành mảng nhãn
    const data = this.doanhthu.map(item => item.tongDoanhThu); // Lấy tổng doanh thu thành mảng dữ liệu

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Doanh thu theo tháng',
                    borderColor: 'rgb(75, 192, 192)',
                    data: data,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
},

    },
    created() {
    }
};
</script>
  