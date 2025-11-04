// js/modules/favorites.js - وحدة المفضلة المبسطة
class FavoritesModule {
    constructor() {
        this.favorites = new Set();
        this.loadFavorites();
        console.log('✅ FavoritesModule: تم التهيئة');
    }

    loadFavorites() {
        try {
            const saved = localStorage.getItem('iptv-favorites');
            if (saved) {
                this.favorites = new Set(JSON.parse(saved));
            }
        } catch (error) {
            console.error('خطأ في تحميل المفضلة:', error);
        }
    }

    saveFavorites() {
        try {
            localStorage.setItem('iptv-favorites', JSON.stringify([...this.favorites]));
        } catch (error) {
            console.error('خطأ في حفظ المفضلة:', error);
        }
    }

    toggle(channelId) {
        if (this.favorites.has(channelId)) {
            this.favorites.delete(channelId);
            console.log(`❌ تمت إزالة القناة ${channelId} من المفضلة`);
        } else {
            this.favorites.add(channelId);
            console.log(`✅ تمت إضافة القناة ${channelId} إلى المفضلة`);
        }
        this.saveFavorites();
        
        // تحديث الواجهة
        if (window.app && window.app.components.uiManager) {
            const channels = window.app.components.channelManager.getChannels();
            window.app.components.uiManager.renderChannels(channels);
        }
        
        return this.favorites.has(channelId);
    }

    isFavorite(channelId) {
        return this.favorites.has(channelId);
    }
}