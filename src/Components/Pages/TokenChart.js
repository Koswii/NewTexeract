import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip );

export const data = {
  labels: ['60,000,000 XERA Coin', '40,000,000 XERA Coin', '50,000,000 XERA Coin', '250,000,000 XERA Coin', '500,000,000 XERA Coin'],
  datasets: [
    {
      label: 'Token Allocation',
      data: [6, 4, 15, 25, 50],
      backgroundColor: [
        '#03254c',
        '#1167b1',
        '#187bcd',
        '#2a9df4',
        '#d0efff',
      ],
      borderColor: [
        '#000000'
      ],
      borderWidth: 1,
    },
  ],
};

export function Chart({ height = 17, width = 17 }) {
    return (
        <div style={{ height: `${height}vw`, width: `${width}vw` }}>
            <Doughnut
                data={data}
                options={{
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                    callbacks: {
                        label: function (context) {
                        const customLabels = [
                            'Project Development', 
                            'Marketing Allocation', 
                            'Investors Allocation', 
                            'Community Airdrop', 
                            'Mainnet Contributors'
                        ];

                        const index = context.dataIndex; // Get the index of the current segment
                        const customLabel = customLabels[index]; // Fetch the corresponding custom label

                        const value = context.raw; // Raw data value
                        const total = context.dataset.data.reduce((sum, val) => sum + val, 0); // Total sum of data
                        const percentage = ((value / total) * 100).toFixed(2); // Percentage calculation

                        return `${customLabel}: ${percentage}%`;
                        },
                    },
                    },
                },
                }}
            />
        </div>
    );
}
