// js/utils/constants.js
const Constants = {
    // إعدادات التطبيق
    APP: {
        NAME: "IPTV Pro",
        VERSION: "1.0.0",
        DESCRIPTION: "تطبيق البث المباشر للقنوات",
        AUTHOR: "IPTV Team",
        LANGUAGE: "ar",
        DIRECTION: "rtl"
    },

    // إعدادات التخزين
    STORAGE_KEYS: {
        FAVORITES: "iptv-favorites",
        SEARCH_HISTORY: "iptv-search-history",
        SETTINGS: "iptv-settings",
        THEME: "iptv-theme",
        ERRORS: "app-errors"
    },

    // أنواع المحتوى
    CONTENT_TYPES: {
        M3U8: "m3u8",
        MP4: "mp4",
        HLS: "application/x-mpegURL",
        MPEG: "video/mp4"
    },

    // جودات الفيديو
    QUALITIES: {
        AUTO: "auto",
        Q1080P: "1080p",
        Q720P: "720p",
        Q480P: "480p",
        Q360P: "360p"
    },

    // تصنيفات القنوات
    CATEGORIES: {
        ALL: "all",
        ENTERTAINMENT: "entertainment",
        SPORTS: "sports",
        NEWS: "news",
        KIDS: "kids",
        MUSIC: "music",
        DOCUMENTARY: "documentary",
        RELIGIOUS: "religious",
        EDUCATIONAL: "educational"
    },

    // رموز الدول
    COUNTRIES: {
        SA: "sa", // السعودية
        AE: "ae", // الإمارات
        EG: "eg", // مصر
        QA: "qa", // قطر
        KW: "kw", // الكويت
        BH: "bh", // البحرين
        OM: "om", // عمان
        ME: "me"  // الشرق الأوسط
    },

    // أعلام الدول
    COUNTRY_FLAGS: {
        sa: "🇸🇦",
        ae: "🇦🇪",
        eg: "🇪🇬",
        qa: "🇶🇦",
        kw: "🇰🇼",
        bh: "🇧🇭",
        om: "🇴🇲",
        me: "🌍",
        default: "🌐"
    },

    // رموز التصنيفات
    CATEGORY_ICONS: {
        all: "📺",
        entertainment: "🎭",
        sports: "⚽",
        news: "📰",
        kids: "🧸",
        music: "🎵",
        documentary: "🌍",
        religious: "🕌",
        educational: "📚"
    },

    // رسائل الإشعارات
    MESSAGES: {
        LOADING: "جاري التحميل...",
        LOADING_CHANNELS: "جاري تحميل القنوات...",
        NO_CHANNELS: "لا توجد قنوات متاحة",
        SEARCH_NO_RESULTS: "لا توجد نتائج للبحث",
        OFFLINE: "أنت غير متصل بالإنترنت",
        ONLINE: "تم استعادة الاتصال",
        FAVORITE_ADDED: "تمت الإضافة إلى المفضلة",
        FAVORITE_REMOVED: "تمت الإزالة من المفضلة",
        PLAYBACK_ERROR: "خطأ في تشغيل الفيديو",
        NETWORK_ERROR: "خطأ في الاتصال بالشبكة",
        QUALITY_CHANGED: "تم تغيير الجودة",
        DATA_LOAD_ERROR: "خطأ في تحميل البيانات"
    },

    // رموز الأخطاء
    ERROR_CODES: {
        NETWORK_ERROR: "NETWORK_ERROR",
        PLAYBACK_ERROR: "PLAYBACK_ERROR",
        LOAD_ERROR: "LOAD_ERROR",
        PARSE_ERROR: "PARSE_ERROR",
        TIMEOUT_ERROR: "TIMEOUT_ERROR"
    },

    // إعدادات الأداء
    PERFORMANCE: {
        DEBOUNCE_TIME: 300,
        LAZY_LOAD_MARGIN: "50px",
        CACHE_TTL: 5 * 60 * 1000, // 5 دقائق
        PRELOAD_COUNT: 3,
        RETRY_ATTEMPTS: 3,
        RETRY_DELAY: 1000
    },

    // إعدادات المشغل
    PLAYER: {
        DEFAULT_QUALITY: "auto",
        KEYBOARD_SHORTCUTS: {
            PLAY_PAUSE: " ",
            CLOSE: "Escape",
            FULLSCREEN: "f",
            FORWARD: "ArrowRight",
            BACKWARD: "ArrowLeft",
            VOLUME_UP: "ArrowUp",
            VOLUME_DOWN: "ArrowDown"
        },
        QUALITY_OPTIONS: [
            { value: "auto", label: "جودة تلقائية" },
            { value: "1080p", label: "1080p" },
            { value: "720p", label: "720p" },
            { value: "480p", label: "480p" },
            { value: "360p", label: "360p" }
        ]
    },

    // إعدادات الواجهة
    UI: {
        THEMES: {
            DARK: "dark",
            LIGHT: "light"
        },
        BREAKPOINTS: {
            MOBILE: 480,
            TABLET: 768,
            DESKTOP: 1024,
            LARGE: 1200
        },
        ANIMATION_DURATION: 300,
        NOTIFICATION_DURATION: 5000
    },

    // URLs أساسية
    URLS: {
        FALLBACK_STREAM: "https://www.w3schools.com/html/mov_bbb.mp4",
        FAVICON: "/assets/images/icons/favicon.ico"
    },

    // إعدادات API
    API: {
        TIMEOUT: 10000,
        MAX_RETRIES: 3,
        CHANNELS_SOURCE: "../data/channels.json"
    }
};

// جعل الثوابت متاحة globally
window.Constants = Constants;