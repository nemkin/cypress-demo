#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
ENV ASPNETCORE_URLS http://*:44319
ENV ASPNETCORE_ENVIRONMENT=Development
EXPOSE 44319

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["CypressDemo.Api/CypressDemo.Api.csproj", "CypressDemo.Api/"]
COPY ["CypressDemo.Domain/CypressDemo.Domain.csproj", "CypressDemo.Domain/"]
COPY ["CypressDemo.Infrastructure/CypressDemo.Infrastructure.csproj", "CypressDemo.Infrastructure/"]
RUN dotnet restore "CypressDemo.Api/CypressDemo.Api.csproj"
COPY . .
WORKDIR "/src/CypressDemo.Api"
RUN dotnet build "CypressDemo.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CypressDemo.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    net-tools \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CypressDemo.Api.dll"]