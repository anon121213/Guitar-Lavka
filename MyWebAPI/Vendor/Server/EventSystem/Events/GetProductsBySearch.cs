using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.DBController;
using Npgsql;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetProductsBySearch(ApplicationDbContext _context)
    : IGetProductsBySearch
{
    private const string EVENTID = "GetProductsBySearch";

    public async Task<List<EventData>> GetProductsSearch(string search,
        int minPrice, int maxPrice, bool isStock)
    {
        string sql = @"
            SELECT * FROM products
            WHERE name LIKE @searchParameter
              AND price >= @minPrice
              AND price <= @maxPrice
        ";

        if (isStock) 
            sql += " AND is_stock = @isStockParameter";
    
        var searchParam =
            new NpgsqlParameter("@searchParameter", $"%{search}%");
        
        var minPriceParam =
            new NpgsqlParameter("@minPrice", minPrice);
        
        var maxPriceParam =
            new NpgsqlParameter("@maxPrice", maxPrice);
        
        var isStockParam =
            new NpgsqlParameter("@isStockParameter", isStock);

        var products = await _context.Products
            .FromSqlRaw(sql, searchParam, minPriceParam, maxPriceParam, isStockParam)
            .ToListAsync();

        return products;
    }


    
    public async Task<EventData?> OnEvent(string eventId, ClientData data = default)
    {
        if (eventId != EVENTID)
            return null;

        var eventData = new EventData
        {
            AllProducts = await GetProductsSearch(data.Search,
                data.MinPrice, data.MaxPrice, data.IsStock)
        };

        return eventData;
    }
}

public interface IGetProductsBySearch : IOnEventCallback
{
    Task<List<EventData>> GetProductsSearch(string search,
        int minPrice, int maxPrice, bool isStock);
}