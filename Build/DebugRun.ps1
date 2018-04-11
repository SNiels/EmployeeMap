docker-compose -f "./docker-compose.yml" -f "./docker-compose.override.yml" -f "./docker-compose.vs.debug.g.yml" --no-ansi up -d

$appId = ((docker ps --filter "ancestor=employeemapapp:debug")[1] -split " ")[0]
$apiId = ((docker ps --filter "ancestor=employeemapapi:debug")[1] -split " ")[0]

$appIp = (docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $appId)
$apiIp = (docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $apiId)

docker exec -d $appId C:\\remote_debugger\\x64\\msvsmon.exe /noauth /anyuser /silent /nostatus /noclrwarn /nosecuritywarn /nofirewallwarn /nowowwarn /timeout:214748364
docker exec -d $apiId C:\\remote_debugger\\x64\\msvsmon.exe /noauth /anyuser /silent /nostatus /noclrwarn /nosecuritywarn /nofirewallwarn /nowowwarn /timeout:214748364

$appTarget = $appId + ":4022"
$apiTarget = $apiId + ":4022"

./RemoteDebugAttach.exe 15 "Remote (no authentication)" $appTarget "dotnet.exe"
./RemoteDebugAttach.exe 15 "Remote (no authentication)" $apiTarget "dotnet.exe"