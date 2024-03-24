"use client"

import React, { useEffect, useState  } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const InvoiceChart = ({user}) => {
  // Sample data for demonstration
  const [invoiceData, setInvoiceData] = useState({
    paid: 0,
    unpaid: 0,
    sent : 0 ,
    overdue : 0
  });

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/invoices?userId=${user.uid}`); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
       
        // Filter and count the number of paid and pending invoices
        const paidInvoices = data.filter((invoice) => invoice.status === 'paid');
        const pendingInvoices = data.filter((invoice) => invoice.status === 'pending');
        const sentInvoices = data.filter((invoice) => invoice.status === 'sent');
        const overDueInvoices = data.filter((invoice) => invoice.status === 'overdue');

        console.log("wozza")
        console.log(pendingInvoices)
        console.log(paidInvoices)

        setInvoiceData({
          paid: paidInvoices.length,
          pending: pendingInvoices.length,
          sent : sentInvoices.length,
          overdue : overDueInvoices.length
        });
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchInvoiceData();
  }, []);

 


  const chartData = {
    labels: ['Paid', 'Unpaid' , 'sent' , 'overdue'],
    datasets: [
      {
        data: [invoiceData.paid, invoiceData.pending , invoiceData.sent , invoiceData.overdue],
        backgroundColor: ['#00ff22', '#e96f0c' , '#0c92ff', '#ff0000'],
        hoverBackgroundColor: ['#00ff22', '#e96f0c' , '#0c92ff', '#ff0000'],
      },
    ],
  };

  return (
    <div className={`p-4 rounded-sm my-8 w-72 h-72`}>
      <h2 className={` text-black font-bold mb-4 `}>Invoice Status</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default InvoiceChart;
