FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
#COPY EmployeeMap.sln ./
COPY EmployeeMap.Api/EmployeeMap.Api.csproj EmployeeMap.Api/
COPY EmployeeMap.Data/EmployeeMap.Data.csproj EmployeeMap.Data/
WORKDIR /src/EmployeeMap.Api
RUN dotnet restore -nowarn:msb3202,nu1503

WORKDIR /src
COPY EmployeeMap.Api EmployeeMap.Api
COPY EmployeeMap.Data EmployeeMap.Data
WORKDIR /src/EmployeeMap.Api
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=build /app .
ENV DOTNET_RUNNING_IN_CONTAINER=true
ENTRYPOINT ["dotnet", "EmployeeMap.Api.dll"]
