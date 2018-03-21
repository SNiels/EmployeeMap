# escape=`
FROM microsoft/aspnetcore-build:2.0

EXPOSE 80

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

WORKDIR /source/EmployeeMap.App
COPY ./EmployeeMap.App/package.json  ./package.json
COPY ./EmployeeMap.App/package-lock.json  ./package-lock.json
RUN npm install

COPY ./EmployeeMap.App/EmployeeMap.App.csproj  ./EmployeeMap.App.csproj
RUN dotnet restore

COPY ./EmployeeMap.App ./../EmployeeMap.App
ENV NODE_ENV=production
RUN npm run-script build-docker
RUN dotnet publish -o ../../publish
WORKDIR /publish

ENTRYPOINT ["dotnet", "EmployeeMap.App.dll"]