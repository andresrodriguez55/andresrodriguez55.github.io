import React from 'react';
import { Pie } from 'react-chartjs-2';
import "./CountriesOfCommentsPieChartComponent.css"

function getMultipleColors(numberOfColors) {
    const colors = ["red", "blue", "yellow", "orange", "brown", "pink", "purple"];
    let temp = 0;

    while (colors.length < numberOfColors) {
        colors.push(colors[(temp++) % colors.length]);
    }

    return colors;
}

export default function CountriesOfCommentsPieChart({ countriesOfComments }) {
    return (
        <div className="chartArea">
            <Pie data={{
                labels: countriesOfComments.map(info => info.country),
                datasets: [{
                    backgroundColor: getMultipleColors(countriesOfComments.length),
                    data: countriesOfComments.map(info => info.commentsCount)
                }]
            }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        title: { text: "Countries of Comments", display: true }
                    }
                }}
                height={290} />
        </div>
    );
}