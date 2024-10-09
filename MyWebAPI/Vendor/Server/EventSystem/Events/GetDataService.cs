using Microsoft.EntityFrameworkCore;
using MyWebAPI.Data;

namespace MyWebAPI.Vendor.Server;

public class GetDataService(ApplicationDbContext context) : IGetDataService
{
    public async Task<EventData?> GetData(int eventId)
    {
        var product = await context.Products
            .FirstOrDefaultAsync(x => x.Id == 1);

        return product;
    }
    
    public async Task<EventData?> OnEvent(int eventId)
    {
        if (eventId != 1)
            return null;
        
        return await GetData(eventId);
    }
}

public interface IGetDataService : IOnEventCallback
{
    Task<EventData?> GetData(int eventId);
}