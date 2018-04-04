FROM microsoft/aspnetcore-build:2.0-nanoserver-sac2016 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0-nanoserver-sac2016 AS build
WORKDIR /src
COPY EmployeeMap.sln ./
COPY EmployeeMap.App/EmployeeMap.App.csproj EmployeeMap.App/
RUN dotnet restore -nowarn:msb3202,nu1503

COPY EmployeeMap.App/package.json  EmployeeMap.App/
COPY EmployeeMap.App/package-lock.json  EmployeeMap.App/
WORKDIR /src/EmployeeMap.App
RUN npm install

COPY EmployeeMap.App .
#RUN dotnet build -c Release -o /app
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
#VOLUME C:/app
#RUN set-itemproperty -path 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\DOS Devices' -Name 'G:' -Value '\??\C:\app' -Type String
COPY --from=build /app .
#WORKDIR 'G:\\'
ENTRYPOINT ["dotnet", "EmployeeMap.App.dll"]
