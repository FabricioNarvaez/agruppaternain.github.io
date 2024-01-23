const teamTitle = document.getElementById('teamTitle');
const params = new URLSearchParams(window.location.search);
const group= params.get('group');
const equipoId = params.get('id');
teamTitle.innerHTML = equipoId + 'grupo'+group;