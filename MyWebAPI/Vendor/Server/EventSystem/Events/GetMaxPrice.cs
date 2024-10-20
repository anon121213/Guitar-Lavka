using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.DBController;
using Npgsql;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetMaxPrice(ApplicationDbContext _context) : IGetMaxPrice
{
    private const string EVENTID = "GetMaxPrice";
    
    public async Task<float> GetPrice(int minPrice, 
        int maxPrice, 
        bool isStock,
        int productType,
        string search)
    {
        string sql = $@"
                SELECT *
                FROM productdetails
                WHERE LOWER(name) LIKE LOWER(@searchParameter)
                  AND price >= @minPrice
                  AND price <= @maxPrice
                  {(isStock ? "AND is_stock = @isStockParameter" : "")}
                  AND type = @typeParameter
                ORDER BY price DESC
                LIMIT 1";
        
        var parameters = new List<NpgsqlParameter>
        {
            new ("@minPrice", minPrice),
            new ("@maxPrice", maxPrice),
            new ("@searchParameter", $"%{search}%"),
            new ("@typeParameter", productType),
            new ("@isStockParameter", isStock)
        }.ToArray();


        var products = await _context.Products
            .FromSqlRaw(sql, parameters.ToArray<object>())
            .ToListAsync();
    
        return products[0].Price;
    }
    
    public async Task<EventData?> OnEvent(string eventId, ClientData data = default)
    {
        if (eventId != EVENTID)
            return null;
           
        float count = await GetPrice(data.MinPrice,
            data.MaxPrice,
            data.IsStock,
            data.Type,
            data.Search);
        
        EventData eventData = new EventData
            { Price = count };

        return eventData;
    }
}

public interface IGetMaxPrice : IOnEventCallback
{
    Task<float> GetPrice(int minPrice,
        int maxPrice,
        bool isStock,
        int productType,
        string search);
}