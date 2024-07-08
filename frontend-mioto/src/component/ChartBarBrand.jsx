import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title);

function ChartBarBrand({ data }) {

    const chartData = {
        labels: data.res && data.res.brand && data.res.brand,
        datasets: [
            {
                label: 'Xe đăng ký',
                data: data.res && data.res.count && data.res.count,
                backgroundColor: '#3b82f6', // Màu của cột đăng ký
                borderColor: '#3b82f6',
                borderWidth: 1,
                barPercentage: 0.6, // Độ rộng của cột
                color: "black"
            },
            {
                label: 'Lượt thuê',
                data: data.res1 && data.res1.countRent && data.res1.countRent,
                backgroundColor: '#ef4444', // Màu của cột thuê
                borderColor: '#ef4444',
                borderWidth: 1,
                barPercentage: 0.6, // Độ rộng của cột
                color: "black"
            },
        ],
    };

    const options = {
        responsive: true,
        indexAxis: 'x', // Sắp xếp theo trục x
        plugins: {
            datalabels: {
                color: 'white',
                font: {
                    weight: 'bold',
                    size: 13
                },
                formatter: (value, context) => {
                    return value;
                }
            },
            legend: {
                position: 'bottom',
                font: {
                    weight: 'bold',
                    size: 16
                },
            },
        },
        scales: {
            x: {
                stacked: false, // Không xếp chồng các nhóm cột
            },
            y: {
                beginAtZero: true, // Bắt đầu từ 0
                title: {
                    display: true,
                    text: 'Số lượng',
                    font: {
                        weight: 'bold',
                        size: 16
                    },
                },
            },
        },
    };

    return (
        <>
            <div className='sm:hidden md:h-[500px] lg:h-[400px] xl:h-[400px] w-full'>
                <Bar data={chartData} options={options} />
            </div>
            <div className='md:hidden lg:hidden xl:hidden w-full'>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-2 py-2 border-b border-gray-300 bg-gray-200 text-center text-sm font-medium text-gray-600">Hãng xe</th>
                            <th className="px-2 py-2 border-b border-gray-300 bg-gray-200 text-center text-sm font-medium text-gray-600">Đăng ký</th>
                            <th className="px-2 py-2 border-b border-gray-300 bg-gray-200 text-center text-sm font-medium text-gray-600">Lượt thuê</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.res && data.res.brand && data.res.brand.length > 0 &&
                            data.res.brand.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border-b text-sm text-center border-gray-300">{data.res && data.res.brand && data.res.brand[index]}</td>
                                        <td className="px-4 py-2 border-b text-sm text-center border-gray-300">{data.res && data.res.count && data.res.count[index]}</td>
                                        <td className="px-4 py-2 border-b text-sm text-center border-gray-300">{data.res1 && data.res1.countRent && data.res1.countRent[index]}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};


export default ChartBarBrand;
