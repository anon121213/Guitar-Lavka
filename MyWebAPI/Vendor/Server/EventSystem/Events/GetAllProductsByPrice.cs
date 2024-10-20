using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.DBController;
using Npgsql;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetAllProductsByPrice(ApplicationDbContext _context)
    : IGetAllProductsByPrice
{
    private const string EVENTID = "GetProductsByPrice"; 

    public async Task<EventData?> GetProductsByPrice(int minPrice, 
        int maxPrice,
        bool isStock,
        PriceType priceType,
        int type,
        string search)
    {
        string order = "";

        order += priceType switch
        {
            PriceType.Default => "",
            PriceType.Ascending => "ASC",
            PriceType.Descending => "DESC",
            _ => ""
        };

        var sql = $@"
            SELECT * FROM productdetails
            WHERE LOWER(name) LIKE LOWER(@searchParameter)
              AND price >= @minPrice
              AND price <= @maxPrice
              {(isStock ? "AND is_stock = @isStockParameter" : "")}
              AND type = @typeParameter
            {(order == "" ? "" : $"ORDER BY price {order}")}";

        var parameters = new List<NpgsqlParameter>
        {
            new ("@minPrice", minPrice),
            new ("@maxPrice", maxPrice),
            new ("@searchParameter", $"%{search}%"),
            new ("@typeParameter", type)
        }.ToArray();

        if (isStock) 
            parameters = parameters
                .Append(new NpgsqlParameter("@isStockParameter", isStock))
                .ToArray();
        
        var products = await _context.Products
            .FromSqlRaw(sql, parameters.ToArray<object>())
            .ToListAsync();

        return new EventData { AllProducts = products };
    }

    public async Task<EventData?> OnEvent(string eventId, ClientData data)
    {
        if (eventId != EVENTID)
            return null;
        
        return await GetProductsByPrice(data.MinPrice,
                data.MaxPrice,
                data.IsStock,
                data.PriceType,
                data.Type,
                data.Search);
    }
}

public interface IGetAllProductsByPrice : IOnEventCallback
{
    Task<EventData?> GetProductsByPrice(int minPrice,
        int maxPrice,
        bool isStock, 
        PriceType isDescending,
        int type, 
        string search);
}
