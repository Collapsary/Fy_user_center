@echo off
echo 清理前端缓存...

REM 删除node_modules
if exist node_modules (
    echo 删除 node_modules...
    rmdir /s /q node_modules
)

REM 删除构建文件
if exist dist (
    echo 删除 dist...
    rmdir /s /q dist
)

REM 删除缓存文件
if exist .umi (
    echo 删除 .umi...
    rmdir /s /q .umi
)

if exist .umi-production (
    echo 删除 .umi-production...
    rmdir /s /q .umi-production
)

if exist .umi-test (
    echo 删除 .umi-test...
    rmdir /s /q .umi-test
)

echo 重新安装依赖...
npm install

echo 缓存清理完成！
echo 请运行 npm start 启动开发服务器
pause
