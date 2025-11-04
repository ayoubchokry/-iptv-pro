// js/modules/player.js - الإصدار المحدث مع زر التشغيل
class PlayerModule {
    constructor() {
        this.currentChannel = null;
        this.playerModal = document.getElementById('playerModal');
        this.videoPlayer = document.getElementById('videoPlayer');
        this.qualitySelect = document.getElementById('qualitySelect');
        this.playOverlay = null;
        console.log('✅ PlayerModule: تم التهيئة');
    }

    async playChannel(channelId) {
        try {
            const channel = window.app.components.channelManager.getChannelById(channelId);
            if (!channel) {
                throw new Error('القناة غير موجودة');
            }

            this.currentChannel = channel;
            
            // استخدام أول stream مباشرة
            if (channel.streams && channel.streams[0]) {
                this.showPlayer();
                this.videoPlayer.src = channel.streams[0].url;
                this.videoPlayer.load();

                // محاولة التشغيل التلقائي
                this.videoPlayer.play().catch(error => {
                    console.log('التشغيل التلقائي ممنوع - عرض زر التشغيل');
                    this.showPlayButton();
                });
            } else {
                throw new Error('لا توجد روابط تشغيل متاحة');
            }

        } catch (error) {
            console.error('خطأ في تشغيل القناة:', error);
            if (window.app && window.app.showError) {
                window.app.showError('تعذر تشغيل القناة: ' + error.message);
            }
        }
    }

    getStreamUrl(channel) {
        if (!channel.streams || channel.streams.length === 0) {
            return null;
        }
        return channel.streams[0].url;
    }

    showPlayer() {
        if (this.playerModal) {
            this.playerModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // إعداد زر التشغيل اليدوي
            this.setupPlayButton();
        }
    }

    setupPlayButton() {
        // إنشاء زر التشغيل إذا لم يكن موجوداً
        if (!this.playOverlay) {
            this.playOverlay = document.createElement('div');
            this.playOverlay.className = 'play-overlay';
            this.playOverlay.innerHTML = `
                <div class="play-button">
                    <span class="play-icon">▶️</span>
                    <span class="play-text">اضغط للتشغيل</span>
                </div>
            `;
            
            this.playOverlay.onclick = () => {
                this.videoPlayer.play().then(() => {
                    this.hidePlayButton();
                }).catch(error => {
                    console.log('فشل التشغيل اليدوي:', error);
                });
            };
            
            this.playerModal.querySelector('.player-container').appendChild(this.playOverlay);
        }
    }

    showPlayButton() {
        if (this.playOverlay) {
            this.playOverlay.style.display = 'flex';
        }
    }

    hidePlayButton() {
        if (this.playOverlay) {
            this.playOverlay.style.display = 'none';
        }
    }

    close() {
        if (this.playerModal) {
            this.playerModal.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (this.videoPlayer) {
            this.videoPlayer.pause();
            this.videoPlayer.src = '';
        }
        this.hidePlayButton();
        this.currentChannel = null;
    }
}