using Microsoft.EntityFrameworkCore;
using MyWebAPI.Data;
using MyWebAPI.Vendor.Server.Data;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetDataService(ApplicationDbContext _context) : IGetDataService
{
    private const string EVENTID = "GetData";
    
    public async Task<EventData?> GetData(int eventId)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(x => x.Id == eventId);
        
        return product;
    }
    
    public async Task<EventData?> OnEvent(string eventId, string? data = default)
    {
        if (eventId != EVENTID)
            return null;
        
        return await GetData(Convert.ToInt32(data));
    }
}

public interface IGetDataService : IOnEventCallback
{
    Task<EventData?> GetData(int eventId);
}