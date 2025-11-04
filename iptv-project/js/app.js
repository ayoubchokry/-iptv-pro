// js/app.js - الإصدار المصحح بدون أخطاء
class IPTVApp {
    constructor() {
        this.components = {};
        this.isInitialized = false;
        console.log('🚀 بدء تحميل تطبيق IPTV...');
        this.init();
    }

    async init() {
        try {
            console.log('🔧 تهيئة التطبيق...');
            
            // الانتظار حتى تحميل جميع السكريبتات
            await this.waitForDependencies();
            
            // تهيئة المكونات الأساسية فقط
            this.components.channelManager = new ChannelManager();
            this.components.uiManager = new UIManager();
            
            // تحميل البيانات
            await this.loadData();
            
            this.isInitialized = true;
            console.log('✅ تطبيق IPTV جاهز للاستخدام');
            
        } catch (error) {
            console.error('❌ خطأ في تهيئة التطبيق:', error);
            this.showError('حدث خطأ في تحميل التطبيق: ' + error.message);
        }
    }

    waitForDependencies() {
        return new Promise((resolve) => {
            const checkDependencies = () => {
                if (typeof ChannelManager !== 'undefined' && 
                    typeof UIManager !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(checkDependencies, 100);
                }
            };
            checkDependencies();
        });
    }

    async loadData() {
        try {
            this.showLoading();
            
            // تحميل القنوات
            const channels = await this.components.channelManager.loadChannels();
            
            // تحميل التصنيفات وعرضها
            const categories = this.components.channelManager.getCategories();
            this.components.uiManager.renderCategories(categories);
            
            // عرض القنوات
            this.components.uiManager.renderChannels(channels);
            
            // تهيئة البحث والمفضلة بعد تحميل البيانات
            this.initializeOptionalModules();
            
            this.hideLoading();
            
        } catch (error) {
            console.error('خطأ في تحميل البيانات:', error);
            this.showError('تعذر تحميل بيانات القنوات');
        }
    }

    initializeOptionalModules() {
        try {
            // تهيئة المشغل إذا كان موجوداً
            if (typeof PlayerModule !== 'undefined') {
                this.components.player = new PlayerModule();
            }
            
            // تهيئة البحث إذا كان موجوداً
            if (typeof SearchModule !== 'undefined') {
                this.components.search = new SearchModule();
            }
            
            // تهيئة المفضلة إذا كانت موجودة
            if (typeof FavoritesModule !== 'undefined') {
                this.components.favorites = new FavoritesModule();
            }
            
            console.log('✅ تم تهيئة الوحدات الاختيارية');
        } catch (error) {
            console.log('⚠️ بعض الوحدات غير متاحة، لكن التطبيق يعمل');
        }
    }

    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'block';
    }

    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'none';
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff6b6b;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        errorDiv.innerHTML = `
            <strong>⚠️ خطأ</strong>
            <p style="margin: 10px 0 0 0; font-size: 14px;">${message}</p>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: #ff6b6b;
                border: none;
                padding: 5px 15px;
                border-radius: 5px;
                margin-top: 10px;
                cursor: pointer;
            ">حسناً</button>
        `;
        document.body.appendChild(errorDiv);
    }

    // طرق التشغيل الأساسية
    playChannel(channelId) {
        if (this.components.player) {
            this.components.player.playChannel(channelId);
        } else {
            // بديل بسيط إذا لم يكن المشغل جاهزاً
            const channel = this.components.channelManager.getChannelById(channelId);
            if (channel && channel.streams && channel.streams[0]) {
                window.open(channel.streams[0].url, '_blank');
            }
        }
    }

    closePlayer() {
        if (this.components.player) {
            this.components.player.close();
        }
    }

    toggleFavorite(channelId, event) {
        if (event) event.stopPropagation();
        
        if (this.components.favorites) {
            this.components.favorites.toggle(channelId);
        } else {
            // بديل بسيط باستخدام ChannelManager مباشرة
            this.components.channelManager.toggleFavorite(channelId);
            // إعادة عرض القنوات لتحديث الأيقونات
            const channels = this.components.channelManager.getChannels();
            this.components.uiManager.renderChannels(channels);
        }
    }
}

// تهيئة التطبيق بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 تم تحميل الصفحة، بدء التطبيق...');
    window.app = new IPTVApp();
});

window.IPTVApp = IPTVApp;