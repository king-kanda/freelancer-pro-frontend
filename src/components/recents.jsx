import React, { useEffect, useState } from 'react';

const InvoiceList = () => {
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/invoices');
        const data = await response.json();
        setInvoiceData(data);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, []);


  const generateInitials = (name) => {
    const initials = name.split(' ').map(word => word.charAt(0)).join('');
    return initials.toUpperCase();
  };

  // Function to generate random background color
  const getRandomColor = () => {
    const colors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="bg-white border border-gray-100 p-6 mt-6">
      <div className="font-medium mb-4">Invoice List</div>
      <div className="overflow-x-auto ">
        <table className="w-full min-w-[460px]">
          <thead>
            <tr>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Client Name
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Client Email
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Invoice Number
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Status
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Amount
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Due Date
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-700 py-2 px-4 bg-gray-50 text-left">
                Date Invoiced
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((invoice) => (
              <tr key={invoice._id}>
                <td className="py-2 px-4 border-b border-b-gray-50">
                <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 flex items-center gap-x-3">
                  <div
                              className="inline-block size-[38px] rounded-full flex items-center justify-center text-white font-semibold"
                              style={{ backgroundColor: getRandomColor() }}
                            >
            
                        {generateInitials(invoice.clientID.name)}
                     
                    </div>
                    <span className="text-black text-sm font-medium">{invoice.clientID.name}</span>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-black text-sm">{invoice.clientID.email}</span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <p className="text-black text-sm">{invoice._id.slice(-5)}</p>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className={`inline-block p-1 rounded ${invoice.status === 'paid' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-500'} font-medium text-[12px] leading-none`}>
                    {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className={`text-[13px] font-medium ${invoice.status === 'paid' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {invoice.status === 'paid' ? `+$${invoice.invoiceTotal}` : `-$${invoice.invoiceTotal}`}
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <p className="text-black text-sm">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <p className="text-black text-sm">{new Date(invoice.dateInvoiced).toLocaleDateString()}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
