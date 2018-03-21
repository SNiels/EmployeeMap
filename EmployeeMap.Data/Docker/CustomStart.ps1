Start-Process powershell.exe -ArgumentList "-file C:\publish\InitDb.ps1";
/start.ps1 -sa_password $env:sa_password -ACCEPT_EULA $env:ACCEPT_EULA -attach_dbs \"$env:attach_dbs\" -Verbose; 