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
        string sql = $@"
            SELECT * FROM productdetails
            WHERE LOWER(name) LIKE LOWER(@searchParameter)
              AND price >= @minPrice
              AND price <= @maxPrice
             {(isStock ? "AND is_stock = @isStockParameter" : "")}
        ";

        var parameters = new List<NpgsqlParameter>
        {
            new ("@minPrice", minPrice),
            new ("@maxPrice", maxPrice),
            new ("@searchParameter", $"%{search}%"),
            new ("@isStockParameter", isStock)
        }.ToArray();

        var products = await _context.Products
            .FromSqlRaw(sql, parameters.ToArray<object>())
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