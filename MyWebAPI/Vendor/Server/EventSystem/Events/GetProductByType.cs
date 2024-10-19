using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.DBController;
using Npgsql;

namespace MyWebAPI.Vendor.Server.EventSystem.Events
{
    public class GetProductByType(ApplicationDbContext context,
        ILogger<GetAllProducts> logger)
        : IGetProductByType
    {
        private const string EVENTID = "GetProductByType";

        public async Task<EventData> GetProduct(int minPrice, int maxPrice, bool isStock, int type, string search)
        {
            var sql = $@"
                SELECT * FROM productdetails
                WHERE LOWER(name) LIKE LOWER(@searchParameter)
                  AND price >= @minPrice
                  AND price <= @maxPrice
                  {(isStock ? "AND is_stock = @isStockParameter" : "")}
                  AND type = @typeParameter";

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

            var parameters = isStock
                ? [minPriceParameter, maxPriceParameter, isStockParameter, searchParameter, typeParameter]
                : new object[] { minPriceParameter, maxPriceParameter, searchParameter, typeParameter };

            var products = await context.Products
                .FromSqlRaw(sql, parameters)
                .ToListAsync();

            logger.LogInformation($"Found {minPrice} products");
            logger.LogInformation($"Found {maxPrice} products");
            logger.LogInformation($"Found {isStock} products");
            logger.LogInformation($"Found {type} products");
            logger.LogInformation($"Found {search} products");

            return new EventData { AllProducts = products };
        }

        public async Task<EventData?> OnEvent(string eventId, ClientData data = default)
        {
            if (eventId == EVENTID)
                return await GetProduct(data.MinPrice, data.MaxPrice, data.IsStock, data.Type, data.Search);

            return null;
        }
    }

    public interface IGetProductByType : IOnEventCallback
    {
        Task<EventData> GetProduct(int minPrice, int maxPrice, bool isStock, int type, string search);
    }
}
