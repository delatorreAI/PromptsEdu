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

window.addEventListener('load', adaptInterface);
