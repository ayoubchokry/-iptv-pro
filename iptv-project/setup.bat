@echo off
chcp 65001 >nul
echo 🌟 بدء إنشاء هيكل مشروع IPTV...

:: إنشاء المجلدات الرئيسية
mkdir css 2>nul
mkdir css\themes 2>nul
mkdir js 2>nul
mkdir js\utils 2>nul
mkdir js\modules 2>nul
mkdir assets 2>nul
mkdir assets\images 2>nul
mkdir assets\images\icons 2>nul
mkdir assets\images\logos 2>nul
mkdir data 2>nul
mkdir config 2>nul
mkdir docs 2>nul

:: إنشاء الملفات الأساسية
cd. > index.html
cd. > service-worker.js
cd. > manifest.json
cd. > robots.txt

cd. > css\style.css
cd. > css\responsive.css
cd. > css\animations.css
cd. > css\themes\dark.css
cd. > css\themes\light.css

cd. > js\app.js
cd. > js\channel-manager.js
cd. > js\performance.js
cd. > js\ui-manager.js
cd. > js\utils\helpers.js
cd. > js\utils\constants.js
cd. > js\utils\validators.js
cd. > js\modules\search.js
cd. > js\modules\favorites.js
cd. > js\modules\player.js

cd. > data\channels.json
cd. > data\categories.json
cd. > data\backup-channels.js

cd. > config\settings.js
cd. > config\api-config.js

cd. > docs\README.md
cd. > docs\setup-guide.md
cd. > docs\api-docs.md

echo ✅ تم إنشاء هيكل المشروع بنجاح!
echo 📁 يمكنك الآن البدء في إضافة المحتوى
pause