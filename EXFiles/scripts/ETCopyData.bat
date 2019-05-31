REM Execute in Windows using: ./EXFiles/scripts/ETCopyData.bat
echo "*** ETCopyData plugin"
call sfdx plugins:uninstall etcopydata
call sfdx plugins:install etcopydata
echo "*** Updating plugins"
call sfdx plugins:update

