using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MyWebAPI.Data;
using MyWebAPI.Vendor.Server.Data;
using Npgsql;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetAllProductsByPrice(ApplicationDbContext context)
    : IGetAllProductsByPrice
{
    private const string REDUSEID = "GetReduseProducts"; 
    private const string INCREASEID = "GetIncreseProducts";

    public async Task<EventData?> GetReducedPrice(int minPrice, int maxPrice)
    {
        const string sql = @"
            SELECT * FROM products
            WHERE price >= @minPrice
              AND price <= @maxPrice
            ORDER BY price DESC";
        
        var minPriceParameter =
            new NpgsqlParameter("@minPrice", minPrice);
        
        var maxPriceParameter =
            new NpgsqlParameter("@maxPrice", maxPrice);
        
        var products = await context.Products
            .FromSqlRaw(sql, minPriceParameter, maxPriceParameter)
            .ToListAsync();

        EventData eventData = new EventData
            { AllProducts = products };
        
        return eventData;
    }

    public async Task<EventData?> GetIncreasePrice(int minPrice, int maxPrice)
    {
        const string sql = @"
            SELECT * FROM products
            WHERE price >= @minPrice
              AND price <= @maxPrice
            ORDER BY price ASC";
        
        var minPriceParameter =
            new NpgsqlParameter("@minPrice", minPrice);
        
        var maxPriceParameter = 
            new NpgsqlParameter("@maxPrice", maxPrice);

        var products = await context.Products
            .FromSqlRaw(sql, minPriceParameter, maxPriceParameter)
            .ToListAsync();

        EventData eventData = new EventData
            { AllProducts = products };
        
        return eventData;
    }

    public async Task<EventData?> OnEvent(string eventId, ClientData data)
    {
        return eventId switch
        {
            REDUSEID => await GetReducedPrice(data.MinPrice, data.MaxPrice),
            INCREASEID => await GetIncreasePrice(data.MinPrice, data.MaxPrice),
            _ => null
        };
    }
}

public interface IGetAllProductsByPrice : IOnEventCallback
{
    Task<EventData?> GetReducedPrice(int minPrice, int maxPrice);
    Task<EventData?> GetIncreasePrice(int minPrice, int maxPrice);
}