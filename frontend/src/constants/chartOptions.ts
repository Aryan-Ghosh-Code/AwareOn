export const sdgColors = {
    sdg13: '#3E7E3E',
    sdg14: '#0077BE',
    sdg15: '#56C02B'
};

export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const } }
};

export const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } }
};

export const stackedBarOptions = {
    ...barOptions,
    scales: { x: { stacked: true }, y: { stacked: true } }
};

export const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            reverse: true
        },
        y: {
            beginAtZero: true
        }
    }
};

export const statesForestLossBarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: '#1F2937',
            titleColor: '#F9FAFB',
            bodyColor: '#F9FAFB',
            borderColor: '#374151',
            borderWidth: 1,
            callbacks: {
                label: (context: any) => `Forest Loss: ${context.parsed.y.toFixed(1)} ha`
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#9CA3AF',
                maxRotation: 45,
                minRotation: 45
            },
            grid: {
                color: '#374151'
            }
        },
        y: {
            ticks: {
                color: '#9CA3AF'
            },
            grid: {
                color: '#374151'
            }
        }
    }
};

export const lossDistDoughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom' as const,
            labels: {
                color: '#9CA3AF',
                usePointStyle: true,
                padding: 15,
                font: {
                    size: 10
                }
            }
        },
        tooltip: {
            backgroundColor: '#1F2937',
            titleColor: '#F9FAFB',
            bodyColor: '#F9FAFB',
            borderColor: '#374151',
            borderWidth: 1,
            callbacks: {
                label: (context: any) => `${context.label}: ${context.parsed.toFixed(1)} ha`
            }
        }
    }
};