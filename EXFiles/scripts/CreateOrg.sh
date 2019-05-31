# Execute in Mac using: ./EXFiles/scripts/CreateOrg.sh
echo "*** Creating scratch Org..."
sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias soDEX602 -d 30
echo "*** Opening scratch Org..."
sfdx force:org:open
echo "*** Pushing metadata to scratch Org..."
sfdx force:source:push
echo "*** Assigning permission set to your user..."
sfdx force:user:permset:assign --permsetname Certification
echo "*** Creating required users..."
sfdx force:apex:execute -f EXFiles/data/CreateUsers.txt
echo "*** Creating data using ETCopyData plugin"
sfdx ETCopyData:import -c EXFiles/data --loglevel warn
