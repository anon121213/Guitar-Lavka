using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor;
using MyWebAPI.Vendor.Installers;
using MyWebAPI.Vendor.Server;
using MyWebAPI.Vendor.Server.DBController;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

DependencyInstaller dependencyInstaller = new DependencyInstaller(builder);
dependencyInstaller.RegisterDependencies();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Убираем перенаправление на HTTPS для упрощения конфигурации
// app.UseHttpsRedirection();

app.UseCors("AllowAllOrigins");
app.UseRouting();

app.MapControllers();

app.Run("http://*:80"); // Убедись, что приложение слушает на порту 80 внутри контейнера