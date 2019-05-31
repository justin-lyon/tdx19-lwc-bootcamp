# Execute in Mac using: ./EXFiles/scripts/ETCopyData.sh
echo "*** ETCopyData plugin"
sfdx plugins:uninstall etcopydata
sfdx plugins:install etcopydata
echo "*** Updating plugins"
sfdx plugins:update

