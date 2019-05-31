REM Execute in Windows using: ./EXFiles/scripts/CreateOrg.bat
echo "*** Creating scratch Org..."
call sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias soDEX602 -d 30
echo "*** Opening scratch Org..."
call sfdx force:org:open
echo "*** Pushing metadata to scratch Org..."
call sfdx force:source:push
echo "*** Assigning permission set to your user..."
call sfdx force:user:permset:assign --permsetname Certification
echo "*** Creating required users..."
call sfdx force:apex:execute -f EXFiles/data/CreateUsers.txt
echo "*** Creating data using ETCopyData plugin"
call sfdx ETCopyData:import -c EXFiles/data --loglevel warn
