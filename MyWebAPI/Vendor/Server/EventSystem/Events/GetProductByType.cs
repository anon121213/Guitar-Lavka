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

        public async Task<EventData> GetProduct(int minPrice,
            int maxPrice,
            bool isStock,
            int type, 
            string search)
        {
            var sql = $@"
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
                new ("@typeParameter", type)
            }.ToArray();

            if (isStock) 
                parameters = parameters
                    .Append(new NpgsqlParameter("@isStockParameter", isStock))
                    .ToArray();
            
            var products = await context.Products
                .FromSqlRaw(sql, parameters.ToArray<object>())
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
                return await GetProduct(data.MinPrice,
                    data.MaxPrice,
                    data.IsStock, 
                    data.Type,
                    data.Search);

            return null;
        }
    }

    public interface IGetProductByType : IOnEventCallback
    {
        Task<EventData> GetProduct(int minPrice,
            int maxPrice,
            bool isStock,
            int type,
            string search);
    }
}
