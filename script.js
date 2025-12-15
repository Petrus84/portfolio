/**
 * LANDING PAGE PREMIUM - INTERATIVIDADE
 * Encoding: UTF-8
 */

// ========================================
// CALCULADORA DE POTENCIAL
// ========================================
function calcularPotencial() {
    const seguidores = parseInt(document.getElementById('seguidores').value) || 0;
    const receitaAtual = parseInt(document.getElementById('receita').value) || 0;
    
    if (seguidores === 0 || receitaAtual === 0) {
        alert('Por favor, preencha ambos os campos com valores válidos.');
        return;
    }
    
    // FÓRMULA CONSERVADORA: R$ 0.60 por seguidor/mês
    const potencial = Math.round(seguidores * 0.60);
    const ganhoMensal = potencial - receitaAtual;
    const ganhoAnual = ganhoMensal * 12;
    
    // ATUALIZAR VALORES NA INTERFACE
    document.getElementById('receita-atual').textContent = 
        `R$ ${receitaAtual.toLocaleString('pt-BR')}`;
    document.getElementById('receita-potencial').textContent = 
        `R$ ${potencial.toLocaleString('pt-BR')}`;
    document.getElementById('ganho-mensal').textContent = 
        `+R$ ${ganhoMensal.toLocaleString('pt-BR')}/mês`;
    document.getElementById('perda-anual').textContent = 
        `R$ ${ganhoAnual.toLocaleString('pt-BR')}`;
    
    // MOSTRAR RESULTADO
    document.getElementById('calc-result').style.display = 'block';
    
    // SCROLL SUAVE ATÉ O RESULTADO
    document.getElementById('calc-result').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

// ========================================
// GRÁFICO DO CASE (Chart.js)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('case-chart');
    
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6'],
                datasets: [
                    {
                        label: 'Receita (R$)',
                        data: [5880, 6500, 7800, 9200, 10100, 10854],
                        borderColor: '#00FF9D',
                        backgroundColor: 'rgba(0, 255, 157, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Assinantes',
                        data: [69, 95, 135, 175, 205, 230],
                        borderColor: '#C9A05C',
                        backgroundColor: 'rgba(201, 160, 92, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#FFFFFF',
                            font: {
                                size: 14,
                                family: 'Inter'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#141414',
                        titleColor: '#FFFFFF',
                        bodyColor: '#A0A0A0',
                        borderColor: '#00FF9D',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            color: '#A0A0A0',
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        ticks: {
                            color: '#A0A0A0'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#A0A0A0'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }
});

// ========================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// ANIMAÇÃO DE ENTRADA AO SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação a elementos
document.querySelectorAll('.case-card, .pacote-card, .diferencial-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('🚀 Landing Page Premium carregada com sucesso!');
