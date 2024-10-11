using Microsoft.EntityFrameworkCore;
using MyWebAPI.Data;
using MyWebAPI.Vendor.Server.Data;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetDataByIdByIdService(ApplicationDbContext _context) : IGetDataByIdService
{
    private const string EVENTID = "GetDataById";
    
    public async Task<EventData?> GetData(int eventId)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(x => x.Id == eventId);
        
        return product;
    }
    
    public async Task<EventData?> OnEvent(string eventId, ClientData data = default)
    {
        if (eventId != EVENTID)
            return null;
        
        return await GetData(Convert.ToInt32(data));
    }
}

public interface IGetDataByIdService : IOnEventCallback
{
    Task<EventData?> GetData(int eventId);
}