"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

function ViewsGraph({ title, data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Views Over the Months",
      },
      datalabels: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4, // smooth curves
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        fill: "origin", // fill the area under the line
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      point: {
        radius: 5, // rounded points
        hitRadius: 10,
        hoverRadius: 8,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        hoverBorderWidth: 2,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Months",
        },
        grid: {
          display: false, // hide grid lines for x-axis
        },
      },
      y: {
        title: {
          display: false,
          text: "Views",
        },
        beginAtZero: true,
        grid: {
          display: false, // hide grid lines for y-axis
        },
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Views",
        data: data, // Data should be an array of views for each month
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Line options={options} data={chartData} />
      </CardContent>
    </Card>
  );
}

export default ViewsGraph;
