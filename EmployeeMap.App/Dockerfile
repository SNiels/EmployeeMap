# escape=`
FROM microsoft/aspnetcore-build:2.0 AS build

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 8.9.4
ENV NODE_DOWNLOAD_SHA 48946e99ac4484e071df25741d2300f3a656f476c5ff3f8116a4746c07ebe3b7
RUN &cmd.exe /c rd /S /Q "${env:ProgramFiles}\nodejs"
RUN &cmd.exe /c move  "${env:ProgramFiles}\nodejs"  "${env:ProgramFiles}\nodejs.old"

# Install node
RUN Invoke-WebRequest -UseBasicParsing https://nodejs.org/dist/v${env:NODE_VERSION}/node-v${env:NODE_VERSION}-win-x64.zip -outfile node8.zip; `
    if ((Get-FileHash node8.zip -Algorithm sha256).Hash -ne $env:NODE_DOWNLOAD_SHA) { `
        Write-Host 'NODEJS CHECKSUM VERIFICATION FAILED!'; `
        exit 1; `
    }; `
    Expand-Archive node8.zip -DestinationPath ${env:TEMP}/node8js-tmp; `
    Move-Item ${env:TEMP}/node8js-tmp/node-v${env:NODE_VERSION}-win-x64 ${env:ProgramFiles}/nodejs -Force; `
    Remove-Item -Force node8.zip; `
    $env:PATH += \";${env:ProgramFiles}\nodejs\";

RUN setx /M PATH $($Env:PATH + ';' + $Env:ProgramFiles + '\nodejs')

WORKDIR /src
COPY EmployeeMap.sln ./
COPY EmployeeMap.App/EmployeeMap.App.csproj EmployeeMap.App/
RUN dotnet restore -nowarn:msb3202,nu1503

COPY EmployeeMap.App/package.json  EmployeeMap.App/
COPY EmployeeMap.App/package-lock.json  EmployeeMap.App/
WORKDIR /src/EmployeeMap.App
RUN npm install

COPY EmployeeMap.App .
RUN dotnet publish -c Release -o /app

FROM  microsoft/aspnetcore-build:2.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "EmployeeMap.App.dll"]
