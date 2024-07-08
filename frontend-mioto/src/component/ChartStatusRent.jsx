import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import "./ChartStatusRent.css"
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ChartStatusRent = ({ data }) => {
    const chartData = {
        labels: ['Đang chờ', 'Sẵn sàng', 'Đang hoạt động', 'Đã hủy', 'Hoàn thành'],
        datasets: [
            {
                label: 'Số lượt',
                data: data,
                backgroundColor: [
                    '#facc15', // Pending
                    '#f9a8d4', // Ready
                    '#4ade80', // Ongoing
                    '#ef4444', // Cancel
                    '#3b82f6'  // Finish
                ],
                hoverBackgroundColor: [
                    '#facc15',
                    '#f9a8d4',
                    '#4ade80',
                    '#ef4444',
                    '#3b82f6'
                ]
            }
        ]
    };


    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                color: 'white',
                font: {
                    weight: 'bold',
                    size: 15
                },
                formatter: (value, context) => {
                    return value;
                }
            },
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltip: {
                enabled: true
            }
        }
    };

    return (
        <div className="chart-container flex h-auto sm:max-w-[300px] md:max-w-[600px] lg:max-w-[400px] xl:max-w-[600px]">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default ChartStatusRent;
