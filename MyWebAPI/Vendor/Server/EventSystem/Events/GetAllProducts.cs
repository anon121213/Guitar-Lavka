using Microsoft.EntityFrameworkCore;
using MyWebAPI.Data;
using MyWebAPI.Vendor.Server.Data;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetAllProducts(ApplicationDbContext _context) : IGetAllProducts
{
    private const string EVENTID = "GetAllProducts";
    
    public async Task<List<EventData>> GetProducts()
    {
        var product = await _context.Products.ToListAsync();
        
        return product;
    }

    public async Task<EventData?> OnEvent(string eventId, string? data = default)
    {
        if (eventId != EVENTID)
            return null;
        
        EventData eventData = new EventData
            { AllProducts = await GetProducts() };

        return eventData;
    }
}

public interface IGetAllProducts : IOnEventCallback
{
    public Task<List<EventData>> GetProducts();
}