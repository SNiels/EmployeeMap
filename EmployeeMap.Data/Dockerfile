FROM microsoft/aspnetcore-build:2.0 as build

WORKDIR /source
COPY ./EmployeeMap.Data ./EmployeeMap.Data
COPY ./EmployeeMap.Data/Docker /publish
WORKDIR /source/EmployeeMap.Data
RUN dotnet restore
RUN dotnet ef migrations script -i -o ../../publish/migrations.sql
WORKDIR /publish
RUN type InitDb.sql >> FullScript.sql
RUN type migrations.sql >> FullScript.sql

FROM microsoft/mssql-server-windows-express as database
COPY --from=build /publish /publish
WORKDIR /
ENV ACCEPT_EULA=Y

CMD publish/CustomStart.ps1 