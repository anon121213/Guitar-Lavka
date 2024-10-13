using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.DBController;
using Npgsql;

namespace MyWebAPI.Vendor.Server.EventSystem.Events
{
    public class GetAllProducts(ApplicationDbContext _context) : IGetAllProducts
    {
        private const string EVENTID = "GetAllProducts";

        public async Task<List<EventData>> GetProducts(bool isStock)
        {
            const string sqlAll = "SELECT * FROM products";
            const string sqlStock = @"
                SELECT * FROM products 
                WHERE is_stock = @isStockParameter";
            
            var isStockParameter = new NpgsqlParameter("@isStockParameter", isStock);

            var sql = isStock ? sqlStock : sqlAll;
            var parameters = isStock ? new object[] { isStockParameter } : Array.Empty<object>();

            return await _context.Products.FromSqlRaw(sql, parameters).ToListAsync();
        }

        public async Task<EventData?> OnEvent(string eventId, ClientData data = default)
        {
            if (eventId != EVENTID) return null;

            var products = await GetProducts(data.IsStock);
            return new EventData { AllProducts = products };
        }
    }

    public interface IGetAllProducts : IOnEventCallback
    {
        Task<List<EventData>> GetProducts(bool isStock);
    }
}