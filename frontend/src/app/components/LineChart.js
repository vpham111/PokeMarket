'use client'
import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function MyChartComponent() {
    const canvasRef = useRef(null);
    const chartRef = useRef(null)

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        if (chartRef.current) {
            chartRef.current.destroy()
        }

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['A', 'B', 'C', 'D'],
                datasets: [{
                    label: 'My Dataset',
                    data: [5, 10, 7, 12],
                    borderColor: 'blue',
                    fill: false
                }]
            }
        });
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{width: '450px', height: '200px'}}>
            <canvas ref={canvasRef}></canvas>;
        </div>
        )

}
