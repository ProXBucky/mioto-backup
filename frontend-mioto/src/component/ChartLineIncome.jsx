// hooks/ChartLineIncome.js
import { useEffect, useState } from 'react';
import { statisticIncome } from '../api/appAPI';
import { useSelector } from 'react-redux';
import { adminTokenSelector } from '../redux/selector';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { formatMoney } from '../utils/formatMoney';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const ChartLineIncome = () => {
    const adminToken = useSelector(adminTokenSelector);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [dataSet, setDataSet] = useState({
        label: [],
        dt: []
    })

    const fetchData = async () => {
        try {
            const response = await statisticIncome(adminToken);
            const { labels, data } = response;
            setDataSet({
                label: labels,
                dt: data
            })
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Doanh thu / tháng',
                        data: data,
                        fill: false,
                        borderColor: '#5fcf86',
                        tension: 0.2
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [adminToken]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Biểu đồ doanh thu hàng tháng',
            },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,  // Set rotation to 90 degrees
                    minRotation: 90   // Ensure rotation is at least 90 degrees
                },
                grid: {
                    display: false,
                },
                padding: 20,  // Add padding to the x-axis
            },
            y: {
                beginAtZero: true,
            },
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        }
    };


    return (
        <>
            <div className='w-full sm:hidden md:h-[450px] lg:h-[500px] xl:h-[550px]'>
                <Line data={chartData} options={options} />
            </div>
            <div className='md:hidden lg:hidden xl:hidden'>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-2 py-2 border-b border-gray-300 bg-gray-200 text-center text-sm font-medium text-gray-600">Tháng năm</th>
                            <th className="px-2 py-2 border-b border-gray-300 bg-gray-200 text-center text-sm font-medium text-gray-600">Doanh thu (VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataSet.label && dataSet.label && dataSet.label.length > 0 &&
                            dataSet.label.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border-b text-sm text-center border-gray-300">{dataSet && dataSet.label && dataSet.label[index]}</td>
                                        <td className="px-4 py-2 border-b text-sm text-center border-gray-300">{dataSet && dataSet.dt && formatMoney(dataSet.dt[index])}</td>
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

export default ChartLineIncome;
