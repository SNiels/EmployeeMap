FROM microsoft/aspnetcore-build:2.0

WORKDIR /source
EXPOSE 80

COPY ./EmployeeMap.Api/EmployeeMap.Api.csproj ./EmployeeMap.Api/EmployeeMap.Api.csproj
COPY ./EmployeeMap.Data/EmployeeMap.Data.csproj ./EmployeeMap.Data/EmployeeMap.Data.csproj
WORKDIR /source/EmployeeMap.Api
RUN dotnet restore

WORKDIR /source
COPY ./EmployeeMap.Api ./EmployeeMap.Api
COPY ./EmployeeMap.Data ./EmployeeMap.Data

WORKDIR /source/EmployeeMap.Api
RUN dotnet publish -o ../../publish -c Release
WORKDIR /publish

ENTRYPOINT ["dotnet", "EmployeeMap.Api.dll"]