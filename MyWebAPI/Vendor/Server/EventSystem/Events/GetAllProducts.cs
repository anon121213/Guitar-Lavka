using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.DBController;
using Npgsql;

namespace MyWebAPI.Vendor.Server.EventSystem.Events
{
    public class GetAllProducts(ApplicationDbContext _context, 
        ILogger<GetAllProducts> _logger) : IGetAllProducts
    {
        private const string EVENTID = "GetAllProducts";

        public async Task<List<EventData>> GetProducts(bool isStock, int type)
        {
            string sql = $@"
                SELECT * FROM productdetails 
                WHERE type = @typeParameter
                  {(isStock ? "AND is_stock = @isStockParameter" : "")}";
            
            var isStockParameter =
                new NpgsqlParameter("@isStockParameter", isStock);
            
            var typeParameter =
                new NpgsqlParameter("@typeParameter", type);

            var parameters = isStock ? [ isStockParameter, typeParameter ]
                : new object[] { typeParameter };

            return await _context.Products.FromSqlRaw(sql, parameters).ToListAsync();
        }

        public async Task<EventData?> OnEvent(string eventId, ClientData data = default)
        {
            if (eventId != EVENTID) 
                return null;
            
            var products = await GetProducts(data.IsStock, data.Type);
            return new EventData { AllProducts = products };
        }
    }

    public interface IGetAllProducts : IOnEventCallback
    {
        Task<List<EventData>> GetProducts(bool isStock, int type);
    }
}