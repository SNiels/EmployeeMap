FROM microsoft/aspnetcore-build:2.0

EXPOSE 80

WORKDIR /source/EmployeeMap.App
COPY ./EmployeeMap.App/package.json  ./package.json
RUN npm install

COPY ./EmployeeMap.App/EmployeeMap.App.csproj  ./EmployeeMap.App.csproj
RUN dotnet restore

COPY ./EmployeeMap.App ./../EmployeeMap.App
ENV NODE_ENV=production
RUN npm run-script build-docker
RUN dotnet publish -o ../../publish
WORKDIR /publish

ENTRYPOINT ["dotnet", "EmployeeMap.App.dll"]