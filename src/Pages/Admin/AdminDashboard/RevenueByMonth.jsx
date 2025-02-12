// import { Tooltip } from 'antd';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const RevenueByMonth = ({data}) => {

    const chartData = {
        labels: data?.map((item) => `Month ${item.month}`), // Extract months as labels
        datasets: [
          {
            type: 'bar',
            label: 'Revenue Amounts ($)',
            backgroundColor: 'rgba(179, 57, 139, 0.2)',
            borderColor: 'rgba(179, 57, 139, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(179, 57, 139, 0.4)',
            hoverBorderColor: 'rgba(179, 57, 139, 1)',
            data: data?.map((item) => parseFloat(item.revenue)) // Extract revenue values and convert to numbers
          },
          {
            type: 'bar',
            label: 'Order Count',
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue color for order count
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
            hoverBorderColor: 'rgba(54, 162, 235, 1)',
            data: data?.map((item) => item.order_count) // Extract order count
          }
        ]
      };
      
      

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e8eaed',
          borderColor: '#e8eaed',
        }
      },
      x: {
        grid: {
          color: '#e8eaed',
          borderColor: '#e8eaed',
        }
      }
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: 'black',
        }
      }
    } 
  };

  return (
    <div className='p-5 bg-white rounded-md'>
      <p className='text-2xl mb-3'>Revenue By Month</p>
      <Bar
        className='text-black'
        data={chartData}
        options={options}
      />
    </div>
  )
}

export default RevenueByMonth