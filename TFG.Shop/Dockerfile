#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN curl -sL https://deb.nodesource.com/setup_12.x |  bash -
RUN apt-get install -y nodejs
RUN npm install --global yarn
WORKDIR /src

COPY ["TFG.Shop/TFG.Shop.csproj", "TFG.Shop/"]
RUN dotnet restore "TFG.Shop/TFG.Shop.csproj"
COPY . .
WORKDIR "/src/TFG.Shop"
RUN dotnet build "TFG.Shop.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TFG.Shop.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TFG.Shop.dll"]