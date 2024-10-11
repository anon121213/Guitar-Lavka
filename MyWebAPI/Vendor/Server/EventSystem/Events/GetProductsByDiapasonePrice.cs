using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MyWebAPI.Data;
using MyWebAPI.Vendor.Server.Data;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetProductsByDiapasonePrice(ApplicationDbContext _context) : IGetProductsByDiapasonePrice
{
    private const string EVENTID = "GetProductsByDiapasonePrice";
    
    public async Task<EventData?> GetDiapasonePrice(int minPrice, int maxPrice)
    {
        var minPriceParameter =
            new SqlParameter("@minPrice", minPrice);
        
        var maxPriceParameter =
            new SqlParameter("@maxPrice", maxPrice);
        
        var sql = "SELECT * FROM Products WHERE Price >= @minPrice AND Price <= @maxPrice";
        
        var products = await _context.Products
            .FromSqlRaw(sql, minPriceParameter, maxPriceParameter)
            .ToListAsync();

        EventData eventData = new EventData
            { AllProducts = products };

        return eventData;
    }

    public async Task<EventData?> OnEvent(string eventId, ClientData data = default)
    {
        if (eventId != EVENTID)
            return null;
        
        return await GetDiapasonePrice(data.MinPrice, data.MaxPrice);
    }
}

public interface IGetProductsByDiapasonePrice : IOnEventCallback
{
    Task<EventData?> GetDiapasonePrice(int minPrice, int maxPrice);
}