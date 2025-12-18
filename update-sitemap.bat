@echo off
cd /d "%~dp0"

echo Running sitemap generator...
node generate-sitemap.js
IF ERRORLEVEL 1 goto end

echo Pulling latest from GitHub...
git pull --rebase
IF ERRORLEVEL 1 goto end

echo Adding sitemap...
git add sitemap.xml

git diff --cached --quiet
IF ERRORLEVEL 1 git commit -m "Update sitemap (PostFreeSG)"

echo Pushing...
git push

:end
echo.
echo DONE — press any key
pause
