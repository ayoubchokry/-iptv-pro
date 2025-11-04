// js/channel-manager.js - الإصدار المصحح
class ChannelManager {
    constructor() {
        this.channels = [];
        this.categories = [];
        this.favorites = new Set();
        this.loadFavorites();
    }

    async loadChannels(source = 'data/channels.json') {
        try {
            console.log('📡 جاري تحميل القنوات...');
            
            const response = await fetch(source);
            if (!response.ok) throw new Error(`خطأ: ${response.status}`);
            
            const data = await response.json();
            this.channels = data.channels || [];
            this.categories = data.categories || [];
            
            console.log(`✅ تم تحميل ${this.channels.length} قناة`);
            return this.channels;
            
        } catch (error) {
            console.error('❌ خطأ في تحميل القنوات:', error);
            return this.loadBackupChannels();
        }
    }

    loadBackupChannels() {
        console.log('🔄 استخدام القنوات الاحتياطية...');
        
        this.channels = [
            {
                id: 1,
                name: "قناة MBC 1",
                category: "entertainment",
                logo: "📺",
                language: "ar",
                country: "sa",
                isActive: true,
                description: "قناة ترفيهية عامة",
                streams: [
                    {
                        quality: "480p",
                        url: "https://www.w3schools.com/html/mov_bbb.mp4",
                        type: "mp4"
                    }
                ]
            },
            {
                id: 2,
                name: "قناة رياضية",
                category: "sports",
                logo: "⚽",
                language: "ar",
                country: "sa",
                isActive: true,
                description: "قناة رياضية",
                streams: [
                    {
                        quality: "480p",
                        url: "https://www.w3schools.com/html/mov_bbb.mp4",
                        type: "mp4"
                    }
                ]
            }
        ];
        
        this.categories = [
            {id: "all", name: "الكل", icon: "📺"},
            {id: "entertainment", name: "ترفيه", icon: "🎭"},
            {id: "sports", name: "رياضة", icon: "⚽"}
        ];
        
        return this.channels;
    }

    getChannels() { return this.channels; }
    getCategories() { return this.categories; }
    
    getChannelById(id) {
        return this.channels.find(channel => channel.id === id);
    }

    filterByCategory(categoryId) {
        return categoryId === 'all' 
            ? this.channels 
            : this.channels.filter(channel => channel.category === categoryId);
    }

    searchChannels(query) {
        if (!query.trim()) return this.channels;
        const searchTerm = query.toLowerCase();
        return this.channels.filter(channel =>
            channel.name.toLowerCase().includes(searchTerm)
        );
    }

    // الدوال المفقودة التي تسبب الأخطاء
    getBestStream(channel) {
        if (!channel.streams || channel.streams.length === 0) {
            return null;
        }
        // إرجاع أول stream متاح
        return channel.streams[0];
    }

    getBestQuality(channel) {
        const stream = this.getBestStream(channel);
        return stream ? stream.quality : '480p';
    }

    loadFavorites() {
        try {
            const saved = localStorage.getItem('iptv-favorites');
            if (saved) this.favorites = new Set(JSON.parse(saved));
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

    toggleFavorite(channelId) {
        if (this.favorites.has(channelId)) {
            this.favorites.delete(channelId);
        } else {
            this.favorites.add(channelId);
        }
        this.saveFavorites();
        return this.favorites.has(channelId);
    }

    isFavorite(channelId) {
        return this.favorites.has(channelId);
    }
}