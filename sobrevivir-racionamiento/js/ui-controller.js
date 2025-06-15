const DEVICE_CAPABILITIES = {
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
    supportsLocalStorage: (() => {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    })(),
    supportsDragDrop: 'draggable' in document.createElement('div')
};

function adaptInterface() {
    const container = document.getElementById('game-container');
    if (DEVICE_CAPABILITIES.isMobile) {
        container.classList.add('mobile-layout');
    } else if (DEVICE_CAPABILITIES.isTablet) {
        container.classList.add('tablet-layout');
    } else {
        container.classList.add('desktop-layout');
    }
}

function renderInventory() {
    const cont = document.getElementById('inventory-items');
    if (!cont) return;
    cont.innerHTML = '';
    Object.entries(gameState.resources.comida).forEach(([tipo, cantidad]) => {
        for (let i = 0; i < cantidad; i++) {
            const item = document.createElement('div');
            item.className = 'alimento';
            item.textContent = tipo;
            item.draggable = true;
            item.dataset.tipo = tipo;
            item.addEventListener('dragstart', onDragStart);
            item.addEventListener('dragend', onDragEnd);
            cont.appendChild(item);
        }
    });
}

function onDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.tipo);
    e.target.classList.add('dragging');
}

function onDragEnd(e) {
    e.target.classList.remove('dragging');
}

function onDragOver(e) {
    e.preventDefault();
}

function onDrop(e) {
    e.preventDefault();
    const tipo = e.dataTransfer.getData('text/plain');
    const plate = e.currentTarget;
    const comida = document.createElement('div');
    comida.textContent = tipo;
    plate.appendChild(comida);
    const dragging = document.querySelector('.alimento.dragging');
    if (dragging && dragging.parentElement) dragging.remove();
}

window.addEventListener('load', () => {
    adaptInterface();
    renderInventory();
    document.querySelectorAll('.plate-drop').forEach(p => {
        p.addEventListener('dragover', onDragOver);
        p.addEventListener('drop', onDrop);
    });
});
