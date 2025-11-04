// service-worker.js
const CACHE_NAME = 'iptv-pro-v1.2.0';
const urlsToCache = [
    '/iptv-project/',
    '/iptv-project/index.html',
    '/iptv-project/manifest.json',
    '/iptv-project/css/style.css',
    '/iptv-project/css/responsive.css',
    '/iptv-project/css/animations.css',
    '/iptv-project/css/themes/dark.css',
    '/iptv-project/js/app.js',
    '/iptv-project/js/channel-manager.js',
    '/iptv-project/js/ui-manager.js',
    '/iptv-project/js/performance.js',
    '/iptv-project/js/modules/player.js',
    '/iptv-project/js/modules/search.js',
    '/iptv-project/js/modules/favorites.js',
    '/iptv-project/js/utils/helpers.js',
    '/iptv-project/js/utils/constants.js',
    '/iptv-project/data/channels.json',
    '/iptv-project/assets/images/icons/favicon.ico'
];

// التثبيت - تخزين الملفات في الكاش
self.addEventListener('install', (event) => {
    console.log('🚀 Service Worker: التثبيت');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('✅ Service Worker: تخزين الملفات في الكاش');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('✅ Service Worker: تم التثبيت بنجاح');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('❌ Service Worker: خطأ في التثبيت', error);
            })
    );
});

// التنشيط - تنظيف الكاش القديم
self.addEventListener('activate', (event) => {
    console.log('🔄 Service Worker: التنشيط');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Service Worker: حذف الكاش القديم', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker: تم التنشيط بنجاح');
            return self.clients.claim();
        })
    );
});

// اعتراض الطلبات
self.addEventListener('fetch', (event) => {
    // تجاهل طلبات غير HTTP
    if (!event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // إذا وجد الملف في الكاش، أرجعها
                if (response) {
                    return response;
                }

                // إذا لم توجد، أحملها من الشبكة
                return fetch(event.request)
                    .then((response) => {
                        // تحقق أن الطلب ناجح وأنه من نفس المصدر
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // استنساخ الاستجابة لأنها تستخدم مرة واحدة
                        const responseToCache = response.clone();

                        // تخزين الملف الجديد في الكاش
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                // لا تخزن طلبات POST أو لها استعلامات ديناميكية
                                if (event.request.method === 'GET' && 
                                    !event.request.url.includes('?') &&
                                    !event.request.url.includes('m3u8')) {
                                    cache.put(event.request, responseToCache);
                                }
                            });

                        return response;
                    })
                    .catch(() => {
                        // إذا فشل التحميل، حاول إرجاع صفحة بديلة
                        if (event.request.destination === 'document') {
                            return caches.match('/iptv-project/index.html');
                        }
                        
                        // للصور، أرجع صورة بديلة
                        if (event.request.destination === 'image') {
                            return new Response(
                                '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#f0f0f0"/><text x="50" y="50" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">No Image</text></svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                    });
            })
    );
});

// استقبال الرسائل من الصفحة
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// التعامل مع تحديث المحتوى
self.addEventListener('updatefound', () => {
    console.log('🔄 Service Worker: تم اكتشاف تحديث جديد');
});

// التعامل مع اتصال push (للتطوير المستقبلي)
self.addEventListener('push', (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body || 'تحديث جديد متاح!',
        icon: '/iptv-project/assets/images/icons/icon-192.png',
        badge: '/iptv-project/assets/images/icons/icon-72.png',
        tag: 'iptv-update',
        renotify: true,
        actions: [
            {
                action: 'open',
                title: 'فتح التطبيق'
            },
            {
                action: 'close',
                title: 'إغلاق'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'IPTV Pro', options)
    );
});

// النقر على الإشعارات
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.matchAll({ type: 'window' }).then((windowClients) => {
                for (let client of windowClients) {
                    if (client.url.includes('/iptv-project/') && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('/iptv-project/');
                }
            })
        );
    }
});