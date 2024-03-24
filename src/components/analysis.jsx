"use client"

import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const ProjectStatusChart = ({ user }) => {
    const [data, setData] = useState({});
    const chartRef = useRef(null);

    useEffect(() => {
        // Fetch data from different sources (invoice API, clients API, projects API)
        const fetchInvoiceData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/invoices?userId=${user.uid}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        };

        const fetchClientsData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/clients?userId=${user.uid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const clientData = await response.json();
                return clientData;
            } catch (error) {
                console.error('Error fetching clients data:', error.message);
            }
        };

        const fetchProjectsData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/projects?userId=${user.uid}`);
                const result = await response.json();
                return result;
            } catch (error) {
                console.error('Error fetching projects data:', error);
            }
        };

        const processData = (invoices, clients, projects) => {
            // Process the fetched data and calculate totals
            const invoiceTotal = invoices.length; // Just a placeholder for demonstration
            const clientTotal = clients.length; // Just a placeholder for demonstration
            const projectTotal = projects.length; // Just a placeholder for demonstration
        
            return {
                invoices: [invoiceTotal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                clients: [0, clientTotal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
                projects: [0, 0, projectTotal, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
            };
        };

        const fetchData = async () => {
            const invoiceData = await fetchInvoiceData();
            const clientsData = await fetchClientsData();
            const projectsData = await fetchProjectsData();

            // Process the fetched data and calculate totals
            const processedData = processData(invoiceData, clientsData, projectsData);
            setData(processedData);
        };

        fetchData();
    }, [user]);

    useEffect(() => {
        if (!chartRef.current) {
            // Create chart instance if it doesn't exist
            const ctx = document.getElementById('projectChart');
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Invoices',
                        data: data.invoices || [],
                        borderColor: 'orange',
                        fill: false
                    }, {
                        label: 'Clients',
                        data: data.clients || [],
                        borderColor: 'blue',
                        fill: false
                    }, {
                        label: 'Projects',
                        data: data.projects || [],
                        borderColor: 'pink',
                        fill: false
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
                            title: {
                                display: true,
                                text: 'Numbers'
                            },
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }
            });
        } else {
            // Update chart data if it already exists
            chartRef.current.data.datasets[0].data = data.invoices || [];
            chartRef.current.data.datasets[1].data = data.clients || [];
            chartRef.current.data.datasets[2].data = data.projects || [];
            chartRef.current.update();
        }
    }, [data]);

    return (
        <div>
            <h2>Project Status Chart</h2>
            <canvas id="projectChart" width="400" height="200"></canvas>
        </div>
    );
};

export default ProjectStatusChart;
