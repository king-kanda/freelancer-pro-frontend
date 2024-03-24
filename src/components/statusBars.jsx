"use client"

import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';




const ProjectStatusChart = ({user}) => {
    const [statusData, setStatusData] = useState({});
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const userId = '1k3qNh802gdbVwtNkhzBBr2VMe03'; // Your user ID
                const response = await fetch(`http://localhost:8080/api/v1/projects?userId=${user.uid}`);
                const projects = await response.json();
                const data = {};

                projects.forEach(project => {
                    const month = new Date(project.start_date).getMonth(); // Extract month from start date
                    const status = project.status;

                    if (!data[month]) {
                        data[month] = {};
                    }

                    data[month][status] = (data[month][status] || 0) + 1;
                });

                // Fill in missing months with zero counts
                for (let month = 0; month < 12; month++) {
                    if (!data[month]) {
                        data[month] = { 'on track': 0, 'completed': 0, 'suspended': 0, 'awaiting payment': 0 };
                    }
                }

                setStatusData(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (!chartRef.current) {
            // Create chart instance if it doesn't exist
            const ctx = document.getElementById('projectChart');
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'on track',
                        data: [],
                        backgroundColor: '#00ffff'
                    }, {
                        label: 'completed',
                        data: [],
                        backgroundColor: '#0099ff'
                    }, {
                        label: 'suspended',
                        data: [],
                        backgroundColor: '#ff0037'
                    }, {
                        label: 'awaiting payment',
                        data: [],
                        backgroundColor: '#ffb700'
                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Months'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            max: 15, // Set maximum value to 20
                            title: {
                                display: true,
                                text: 'Numbers'
                            }
                        }
                    }
                }
            });
        } else {
            // Update chart data when statusData changes
            Object.keys(statusData).forEach(month => {
                chartRef.current.data.datasets.forEach(dataset => {
                    const status = dataset.label;
                    dataset.data.push(statusData[month][status] || 0);
                });
            });

            chartRef.current.update();
        }
    }, [statusData]);

    return (
        <div>
            <h2>Project Status Chart</h2>
            <canvas id="projectChart" width="400" height="200"></canvas>
        </div>
    );
};

export default ProjectStatusChart;
