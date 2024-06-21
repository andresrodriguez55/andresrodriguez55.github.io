import React from 'react';
import { Line } from 'react-chartjs-2';

function getMonthName(number) {
    switch (number) {
        case 1: return "January";
        case 2: return "February";
        case 3: return "March";
        case 4: return "April";
        case 5: return "May";
        case 6: return "June";
        case 7: return "July";
        case 8: return "August";
        case 9: return "September";
        case 10: return "October";
        case 11: return "November";
        default: return "December";
    }
}

export default function CommentsPerMonthLineChartComponent({ numberOfCommentsPerMonth }) {
    return (
        <div className="chartArea">
            <Line data={{
                labels: numberOfCommentsPerMonth.map(info => getMonthName(info.monthNumber)),
                datasets: [{
                    backgroundColor: "rgba(75,192,192,0.2)",
                    data: numberOfCommentsPerMonth.map(info => info.commentsCount),
                    pointRadius: 8
                }]
            }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        title: { text: "Months of Comments Counts", display: true }
                    }
                }}
                height={290} />
        </div>
    );
}