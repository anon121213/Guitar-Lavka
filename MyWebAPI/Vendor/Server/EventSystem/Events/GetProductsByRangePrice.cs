using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.DBController;
using Npgsql;

namespace MyWebAPI.Vendor.Server.EventSystem.Events
{
    public class GetProductsByRangePrice(ApplicationDbContext _context) : IGetProductsByDiapasonePrice
    {
        private const string EVENTID = "GetProductsByRangePrice";

        public async Task<EventData?> GetDiapasonePrice(int minPrice, int maxPrice,
            bool isStock, string search)
        {
            var sql = $@"
                SELECT * FROM Products
                WHERE name LIKE @searchParameter
                  AND price >= @minPrice 
                  AND price <= @maxPrice 
                {(isStock ? "AND is_stock = @isStockParameter" : "")}";
            
            var minPriceParameter = 
                new NpgsqlParameter("@minPrice", minPrice);
            
            var maxPriceParameter =
                new NpgsqlParameter("@maxPrice", maxPrice);
            
            var isStockParameter =
                new NpgsqlParameter("@isStockParameter", isStock);
            
            var searchParameter =
                new NpgsqlParameter("@searchParameter", $"%{search}%");

            var parameters = isStock
                ? [minPriceParameter, maxPriceParameter, isStockParameter, searchParameter]
                : new object[] { minPriceParameter, maxPriceParameter, searchParameter };

            var products = await _context.Products
                .FromSqlRaw(sql, parameters)
                .ToListAsync();

            return new EventData { AllProducts = products };
        }

        public async Task<EventData?> OnEvent(string eventId, ClientData data = default)
        {
            if (eventId != EVENTID)
                return null;

            return await GetDiapasonePrice(data.MinPrice, data.MaxPrice, data.IsStock, data.Search);
        }
    }

    public interface IGetProductsByDiapasonePrice : IOnEventCallback
    {
        Task<EventData?> GetDiapasonePrice(int minPrice, int maxPrice, 
            bool isStock, string search);
    }
}