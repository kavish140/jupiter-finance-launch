@echo off
cd /d "F:\Websites\personal\Papa\jupiter-finance-launch-main"
git add -A
git commit -m "fix: remove lovable-tagger import to fix CI build failure"
git push origin main
echo DONE
pause

