using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.DBController;
using Npgsql;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetProductsCount(ApplicationDbContext _context) : IGetProductsCount
{
    private const string EVENTID = "GetProductsCount";
    
    public async Task<int> GetStrings(int minPrice, 
        int maxPrice, 
        bool isStock,
        int productType,
        string search)
    {
        string sql = $@"
            SELECT * FROM productdetails
            WHERE LOWER(name) LIKE LOWER(@searchParameter)
              AND price >= @minPrice
              AND price <= @maxPrice
              {(isStock ? "AND is_stock = @isStockParameter" : "")}
              AND type = @typeParameter";
        
        var parameters = new List<NpgsqlParameter>
        {
            new ("@minPrice", minPrice),
            new ("@maxPrice", maxPrice),
            new ("@searchParameter", $"%{search}%"),
            new ("@typeParameter", productType)
        }.ToArray();

        if (isStock) 
            parameters = parameters
                .Append(new NpgsqlParameter("@isStockParameter", isStock))
                .ToArray();

        var products = await _context.Products
            .FromSqlRaw(sql, parameters.ToArray<object>())
            .ToListAsync();

        return products.Count;
    }

    public async Task<EventData?> OnEvent(string eventid, ClientData data = default)
    {
        if (eventid != EVENTID)
            return null;
        
        int count = await GetStrings(data.MinPrice,
            data.MaxPrice,
            data.IsStock,
            data.Type,
            data.Search);
        
        EventData eventData = new EventData
            { ProductsCount = count };

        return eventData;
    }
}

public interface IGetProductsCount : IOnEventCallback
{
    Task<int> GetStrings(int minPrice, 
        int maxPrice, 
        bool isStock,
        int productType,
        string search);
}