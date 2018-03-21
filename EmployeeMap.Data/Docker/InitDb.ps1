timeout 10;
sqlcmd -S localhost -i "C:\publish\FullScript.sql" -U SA -P $env:sa_password;