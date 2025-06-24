import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Dashboard.css";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const [dadosGanhosMensais, setDadosGanhosMensais] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem('token');

        axios.get(`https://integrador-backend.herokuapp.com/dashboard/ganhosMensais`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log(response.data);
                setDadosGanhosMensais(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar dados de ganhos mensais:", error);
                setLoading(false);
            });
    }, []);

    const chartData = {
        labels: dadosGanhosMensais.map(item => `${item.mes}/${item.ano}`),
        datasets: [
            {
                label: 'Ganhos Mensais',
                data: dadosGanhosMensais.map(item => item.total_valor),
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Ganhos Mensais',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return 'R$ ' + tooltipItem.raw
                    }
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return 'R$ ' + value
                    },
                },
            },
        },
    }

    return (
        <div className="dashboard">
            <h2>Ganhos Mensais</h2>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="grafico">
                    <Line data={chartData} options={options} />
                </div>
            )}
        </div>
    );
}

export default Dashboard;
