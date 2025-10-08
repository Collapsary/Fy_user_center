@echo off
echo 正在清理前端缓存...

REM 停止可能运行的进程
taskkill /f /im node.exe 2>nul

REM 清理缓存目录
if exist .umi rmdir /s /q .umi
if exist .cache rmdir /s /q .cache
if exist .mfsu rmdir /s /q .mfsu
if exist .local rmdir /s /q .local
if exist dist rmdir /s /q dist

REM 清理npm缓存
npm cache clean --force

REM 重新安装依赖
echo 重新安装依赖...
npm install

echo 缓存清理完成！
echo 现在可以运行 npm start 启动前端
pause