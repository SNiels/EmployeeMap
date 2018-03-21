FROM microsoft/aspnetcore-build:2.0

WORKDIR /source
EXPOSE 80

COPY ./EmployeeMap.Api ./EmployeeMap.Api
COPY ./EmployeeMap.Data ./EmployeeMap.Data
WORKDIR /source/EmployeeMap.Api
RUN dotnet restore
RUN dotnet publish -o ../../publish
WORKDIR /publish

ENTRYPOINT ["dotnet", "EmployeeMap.Api.dll"]