using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.DBController;
using Npgsql;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetAllProductsByPrice(ApplicationDbContext _context)
    : IGetAllProductsByPrice
{
    private const string REDUSEID = "GetReduseProducts"; 
    private const string INCREASEID = "GetIncreseProducts";

    private async Task<EventData?> GetProductsByPrice(int minPrice, int maxPrice,
        bool isStock, bool isDescending, int type, string search)
    {
        var order = isDescending ? "DESC" : "ASC";
        var sql = $@"
            SELECT * FROM productdetails
            WHERE LOWER(name) LIKE LOWER(@searchParameter)
              AND price >= @minPrice
              AND price <= @maxPrice
              {(isStock ? "AND is_stock = @isStockParameter" : "")}
              AND type = @typeParameter
            ORDER BY price {order}";

        var minPriceParameter =
            new NpgsqlParameter("@minPrice", minPrice);
        
        var maxPriceParameter =
            new NpgsqlParameter("@maxPrice", maxPrice);
        
        var isStockParameter =
            new NpgsqlParameter("@isStockParameter", isStock);
        
        var searchParameter =
            new NpgsqlParameter("@searchParameter", $"%{search}%");
        
        var typeParameter =
            new NpgsqlParameter("@typeParameter", type);

        var parameters = isStock ? [minPriceParameter, maxPriceParameter, isStockParameter, searchParameter, typeParameter]
            : new object[] { minPriceParameter, maxPriceParameter, searchParameter, typeParameter };

        var products = await _context.Products
            .FromSqlRaw(sql, parameters)
            .ToListAsync();

        return new EventData { AllProducts = products };
    }

    public Task<EventData?> GetReducedPrice(int minPrice, int maxPrice, bool isStock, int type, string search) =>
        GetProductsByPrice(minPrice, maxPrice, isStock, true, type, search);

    public Task<EventData?> GetIncreasePrice(int minPrice, int maxPrice, bool isStock, int type, string search) =>
        GetProductsByPrice(minPrice, maxPrice, isStock, false, type, search);

    public async Task<EventData?> OnEvent(string eventId, ClientData data)
    {
        return eventId switch
        {
            REDUSEID => await GetReducedPrice(data.MinPrice, data.MaxPrice, data.IsStock, data.Type, data.Search),
            INCREASEID => await GetIncreasePrice(data.MinPrice, data.MaxPrice, data.IsStock, data.Type, data.Search),
            _ => null
        };
    }
}

public interface IGetAllProductsByPrice : IOnEventCallback
{
    Task<EventData?> GetReducedPrice(int minPrice, int maxPrice, bool isStock, int type, string search);
    Task<EventData?> GetIncreasePrice(int minPrice, int maxPrice, bool isStock, int type, string search);
}
