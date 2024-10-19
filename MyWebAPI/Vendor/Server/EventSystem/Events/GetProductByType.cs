using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.DBController;
using Npgsql;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetProductByType(ApplicationDbContext _context) : IGetProductByType
{
    public async Task<List<EventData>> GetProduct(int type, bool isStock)
    {
        const string sqlAll = "SELECT * FROM productdetails";
        const string sqlStock = @"
                SELECT * FROM productdetails 
                WHERE is_stock = @isStockParameter";
            
        var isStockParameter = new NpgsqlParameter("@isStockParameter", isStock);

        var sql = isStock ? sqlStock : sqlAll;
        var parameters = isStock ? [isStockParameter] : Array.Empty<object>();

        return await _context.Products.FromSqlRaw(sql, parameters).ToListAsync();
    }
    
    public Task<EventData?> OnEvent(string eventId, ClientData data = default)
    {
        throw new NotImplementedException();
    }
}

public interface IGetProductByType : IOnEventCallback
{
}