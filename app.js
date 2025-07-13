let puntosYanet = 100;
let puntosVale = 100;

function updatePoints(player, action) {
  if (action === 'resta') {
    if (player === 'yanet') {
      puntosYanet = Math.max(puntosYanet - 1, 0);
      document.getElementById('yanet-puntos').textContent = puntosYanet;
    } else {
      puntosVale = Math.max(puntosVale - 1, 0);
      document.getElementById('vale-puntos').textContent = puntosVale;
    }
  } else if (action === 'suma') {
    if (player === 'yanet') {
      puntosYanet = Math.min(puntosYanet + 1, 100);
      document.getElementById('yanet-puntos').textContent = puntosYanet;
    } else {
      puntosVale = Math.min(puntosVale + 1, 100);
      document.getElementById('vale-puntos').textContent = puntosVale;
    }
  }

  // Guardar puntos
  localStorage.setItem('puntosYanet', puntosYanet);
  localStorage.setItem('puntosVale', puntosVale);
}

function reiniciarPuntos() {
  let recompensaYanet = puntosYanet < 50 ? 450 : 500;
  let recompensaVale = puntosVale < 50 ? 450 : 500;

  // Mostrar alerta
  Swal.fire({
    title: '✨ Fin de Mes - Recompensas ✨',
    html: `
      <p><strong>👧 Yanet:</strong> ${recompensaYanet} Robux (${puntosYanet} puntos)</p>
      <p><strong>👧 Vale:</strong> ${recompensaVale} Robux (${puntosVale} puntos)</p>
      <p style="margin-top: 10px;">✨ Los puntos de Yanet y Vale vuelven a 100.</p>
      <p style="margin-top: 10px;">☝️ ¡A portarse bien para conseguir la recompensa!</p>
    `,
    icon: 'success',
    confirmButtonText: '¡Entendido!',
    background: '#fff0f5',
    confirmButtonColor: '#ff69b4',
  });

  // Actualizar visual de recompensas
  document.getElementById('recompensa-yanet').textContent = `Recompensa Yanet: ${recompensaYanet} Robux`;
  document.getElementById('recompensa-vale').textContent = `Recompensa Vale: ${recompensaVale} Robux`;

  // Fecha del reinicio
  const fecha = new Date().toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  // Actualizar tabla de historial (reemplaza contenido anterior)
  const tabla = document.getElementById('tabla-recompensas').querySelector('tbody');
  tabla.innerHTML = `
    <tr>
      <td>Yanet</td>
      <td>${puntosYanet}</td>
      <td>${recompensaYanet} Robux</td>
      <td>${fecha}</td>
    </tr>
    <tr>
      <td>Vale</td>
      <td>${puntosVale}</td>
      <td>${recompensaVale} Robux</td>
      <td>${fecha}</td>
    </tr>
  `;

  // Guardar todo en localStorage
  localStorage.setItem('puntosYanet', 100);
  localStorage.setItem('puntosVale', 100);
  localStorage.setItem('recompensaYanet', recompensaYanet);
  localStorage.setItem('recompensaVale', recompensaVale);
  localStorage.setItem('tablaRecompensas', tabla.innerHTML);

  // Reset visual
  puntosYanet = 100;
  puntosVale = 100;
  document.getElementById('yanet-puntos').textContent = 100;
  document.getElementById('vale-puntos').textContent = 100;
}

window.addEventListener('DOMContentLoaded', () => {
  const storedYanet = localStorage.getItem('puntosYanet');
  const storedVale = localStorage.getItem('puntosVale');
  const storedRecompensaYanet = localStorage.getItem('recompensaYanet');
  const storedRecompensaVale = localStorage.getItem('recompensaVale');
  const storedTabla = localStorage.getItem('tablaRecompensas');

  if (storedYanet) {
    puntosYanet = parseInt(storedYanet);
    document.getElementById('yanet-puntos').textContent = puntosYanet;
  }
  if (storedVale) {
    puntosVale = parseInt(storedVale);
    document.getElementById('vale-puntos').textContent = puntosVale;
  }

  if (storedRecompensaYanet !== null) {
    document.getElementById('recompensa-yanet').textContent = `Recompensa Yanet: ${storedRecompensaYanet} Robux`;
  }
  if (storedRecompensaVale !== null) {
    document.getElementById('recompensa-vale').textContent = `Recompensa Vale: ${storedRecompensaVale} Robux`;
  }

  if (storedTabla) {
    document.getElementById('tabla-recompensas').querySelector('tbody').innerHTML = storedTabla;
  }
});
