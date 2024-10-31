'use client';

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressChart = ({ data, labels }: { data: number[], labels: string[] }) => {
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Progress',
                data,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
        ],
    };

    return <Line data={chartData} />
};

export default ProgressChart;