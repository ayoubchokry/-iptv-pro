// js/ui-manager.js - الإصدار المصحح
class UIManager {
    constructor() {
        this.currentCategory = 'all';
        this.initializeElements();
    }

    initializeElements() {
        this.elements = {
            channelsContainer: document.getElementById('channelsContainer'),
            categoriesContainer: document.getElementById('categoriesContainer'),
            searchInput: document.getElementById('searchInput'),
            playerModal: document.getElementById('playerModal'),
            videoPlayer: document.getElementById('videoPlayer')
        };
    }

    renderCategories(categories) {
        if (!this.elements.categoriesContainer) return;

        const categoriesHTML = categories.map(category => `
            <button class="category-btn ${this.currentCategory === category.id ? 'active' : ''}" 
                    data-category="${category.id}"
                    onclick="app.components.uiManager.changeCategory('${category.id}')">
                ${category.icon} ${category.name}
            </button>
        `).join('');

        this.elements.categoriesContainer.innerHTML = categoriesHTML;
    }

    renderChannels(channels) {
        if (!this.elements.channelsContainer) return;

        if (channels.length === 0) {
            this.elements.channelsContainer.innerHTML = `
                <div class="no-channels">
                    <div style="font-size: 3rem; margin-bottom: 20px;">📡</div>
                    <h3>لا توجد قنوات متاحة</h3>
                    <p>جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً</p>
                </div>
            `;
            return;
        }

        const channelsHTML = channels.map(channel => {
            const isFavorite = window.app.components.channelManager.isFavorite(channel.id);
            
            return `
                <div class="channel-card" onclick="app.playChannel(${channel.id})">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                            onclick="app.toggleFavorite(${channel.id}, event)"
                            title="${isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}">
                        ${isFavorite ? '❤️' : '🤍'}
                    </button>
                    <div class="channel-logo">${channel.logo}</div>
                    <div class="channel-name">${channel.name}</div>
                    ${channel.description ? `<div class="channel-desc">${channel.description}</div>` : ''}
                    <div class="channel-meta">
                        <span class="channel-quality">${channel.streams[0]?.quality || '480p'}</span>
                        <span class="channel-status ${channel.isActive ? 'online' : 'offline'}">
                            ${channel.isActive ? '● مباشر' : '○ غير متاح'}
                        </span>
                    </div>
                </div>
            `;
        }).join('');

        this.elements.channelsContainer.innerHTML = channelsHTML;
    }

    changeCategory(categoryId) {
        this.currentCategory = categoryId;
        
        // تحديث الأزرار النشطة
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === categoryId);
        });

        // تصفية القنوات
        const filteredChannels = window.app.components.channelManager.filterByCategory(categoryId);
        this.renderChannels(filteredChannels);
    }

    // الدالة المفقودة التي تسبب الأخطاء
    showNotification(message, type = 'info') {
        console.log(`📢 ${type}: ${message}`);
        // تنفيذ بسيط للإشعارات
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#4cd964' : '#2a5298'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    showPlayer() {
        if (this.elements.playerModal) {
            this.elements.playerModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    hidePlayer() {
        if (this.elements.playerModal) {
            this.elements.playerModal.style.display = 'none';
            document.body.style.overflow = '';
            if (this.elements.videoPlayer) {
                this.elements.videoPlayer.pause();
                this.elements.videoPlayer.src = '';
            }
        }
    }

    loadVideoStream(url) {
        if (this.elements.videoPlayer) {
            this.elements.videoPlayer.src = url;
        }
    }
}