// js/utils/helpers.js
const Helpers = {
    // تنسيق التاريخ والوقت
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    formatTime: (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    },

    // التعامل مع النصوص
    truncateText: (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    },

    capitalizeFirst: (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    },

    // التعامل مع الأرقام
    formatNumber: (num) => {
        return new Intl.NumberFormat('ar-EG').format(num);
    },

    randomInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // التعامل مع المصفوفات والكائنات
    deepClone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },

    shuffleArray: (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },

    // التعامل مع localStorage
    storage: {
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('خطأ في حفظ البيانات:', error);
                return false;
            }
        },

        get: (key, defaultValue = null) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('خطأ في قراءة البيانات:', error);
                return defaultValue;
            }
        },

        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('خطأ في حذف البيانات:', error);
                return false;
            }
        },

        clear: () => {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                console.error('خطأ في مسح البيانات:', error);
                return false;
            }
        }
    },

    // التعامل مع URLs
    url: {
        isValid: (url) => {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        },

        getDomain: (url) => {
            try {
                return new URL(url).hostname;
            } catch {
                return null;
            }
        },

        addParams: (url, params) => {
            const urlObj = new URL(url);
            Object.keys(params).forEach(key => {
                urlObj.searchParams.set(key, params[key]);
            });
            return urlObj.toString();
        }
    },

    // التعامل مع الأخطاء
    errorHandler: (error, context = '') => {
        console.error(`❌ خطأ في ${context}:`, error);
        
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            context: context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        // حفظ الأخطاء للتصحيح
        const errors = Helpers.storage.get('app-errors', []);
        errors.push(errorInfo);
        Helpers.storage.set('app-errors', errors.slice(-10)); // آخر 10 أخطاء فقط
        
        return errorInfo;
    },

    // التأخير
    delay: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // التحقق من الاتصال
    checkOnlineStatus: async () => {
        try {
            const response = await fetch('https://www.google.com/favicon.ico', {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-cache'
            });
            return true;
        } catch {
            return false;
        }
    },

    // إنشاء معرف فريد
    generateId: () => {
        return 'id_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
    }
};

// جعل الأدوات متاحة globally
window.Helpers = Helpers;