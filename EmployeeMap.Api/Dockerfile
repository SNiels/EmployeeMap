FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY EmployeeMap.sln ./
COPY EmployeeMap.Api/EmployeeMap.Api.csproj EmployeeMap.Api/
COPY EmployeeMap.Data/EmployeeMap.Data.csproj EmployeeMap.Data/
RUN dotnet restore -nowarn:msb3202,nu1503
COPY EmployeeMap.Api EmployeeMap.Api
COPY EmployeeMap.Data EmployeeMap.Data
WORKDIR /src/EmployeeMap.Api
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "EmployeeMap.Api.dll"]
