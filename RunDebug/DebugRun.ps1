docker-compose -f "./docker-compose.debug.yml" --no-ansi up -d --force-recreate --build

Start-Sleep -Seconds 5

$appId = ((docker ps --filter "ancestor=employeemapapp:debug")[1] -split " ")[0]
$apiId = ((docker ps --filter "ancestor=employeemapapi:debug")[1] -split " ")[0]

$appIp = (docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $appId)
$apiIp = (docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $apiId)

docker exec -d $appId C:\\remote_debugger\\x64\\msvsmon.exe /noauth /anyuser /silent /nostatus /noclrwarn /nosecuritywarn /nofirewallwarn /nowowwarn /timeout:214748364
docker exec -d $apiId C:\\remote_debugger\\x64\\msvsmon.exe /noauth /anyuser /silent /nostatus /noclrwarn /nosecuritywarn /nofirewallwarn /nowowwarn /timeout:214748364

$appTarget = $appId + ":4022"
$apiTarget = $apiId + ":4022"

Write-Host "Api:" $apiIp
Write-Host "Api: http://employeemapapi"
Write-Host "App:" $appIp
Write-Host "App: http://employeemap"

start "http://employeemapapi/api/employees"
start "http://employeemap"

#make sure app and api is running
$ignr = Invoke-WebRequest "http://employeemapapi/api/employees" -ErrorAction SilentlyContinue
$ignr = Invoke-WebRequest "http://employeemap" -ErrorAction SilentlyContinue
$ignr = $null

#Parameters
## 1: Solution Name is used to run the code only to the VS instance that has the Solution open
## 2: Transportation method for remote debugger
## 3: Target is the hostname/IP/... to the target where remote debugging is running
## 4: The process name you want to attach tos
./RemoteDebugAttach.exe "EmployeeMap.sln" "Remote (no authentication)" "employeemapapi:4022" "dotnet.exe"
./RemoteDebugAttach.exe "EmployeeMap.sln" "Remote (no authentication)" "employeemap:4022" "dotnet.exe"

Read-Host "Press any key to quit"

./RemoteDebugDetach.exe EmployeeMap.sln "dotnet.exe"

docker exec -d $appId C:\\remote_debugger\\x64\\utils\\KillProcess.exe msvsmon.exe
docker exec -d $apiId C:\\remote_debugger\\x64\\utils\\KillProcess.exe msvsmon.exe

docker-compose -f "./docker-compose.debug.yml" --no-ansi down 