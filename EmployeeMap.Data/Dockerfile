FROM microsoft/dotnet:2.1-sdk as build

COPY ./EmployeeMap.Data/Docker /publish

WORKDIR /source/EmployeeMap.Data
COPY ./EmployeeMap.Data/EmployeeMap.Data.csproj EmployeeMap.Data.csproj
RUN dotnet restore

COPY ./EmployeeMap.Data ./../EmployeeMap.Data
RUN dotnet ef migrations script -i -o ../../publish/migrations.sql

WORKDIR /publish
RUN type InitDb.sql >> FullScript.sql
RUN type migrations.sql >> FullScript.sql

FROM microsoft/mssql-server-windows-express as database
COPY --from=build /publish /publish
WORKDIR /
ENV ACCEPT_EULA=Y

CMD publish/CustomStart.ps1 