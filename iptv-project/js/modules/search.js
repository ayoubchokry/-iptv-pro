// js/modules/search.js - وحدة البحث المبسطة
class SearchModule {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.debounceTimeout = null;
        this.initializeSearch();
        console.log('✅ SearchModule: تم التهيئة');
    }

    initializeSearch() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });
        }
    }

    handleSearchInput(query) {
        clearTimeout(this.debounceTimeout);
        
        this.debounceTimeout = setTimeout(() => {
            this.execute(query);
        }, 300);
    }

    execute(query) {
        if (!window.app || !window.app.components.channelManager) return;
        
        const filteredChannels = window.app.components.channelManager.searchChannels(query);
        
        if (window.app.components.uiManager) {
            window.app.components.uiManager.renderChannels(filteredChannels);
        }
    }
}