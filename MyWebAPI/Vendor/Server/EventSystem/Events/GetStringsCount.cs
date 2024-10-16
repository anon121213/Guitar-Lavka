﻿using Microsoft.EntityFrameworkCore;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.DBController;

namespace MyWebAPI.Vendor.Server.EventSystem.Events;

public class GetStringsCount(ApplicationDbContext _context) : IGetStringsCount
{
    private const string EVENTID = "GetStringsCount";
    
    public async Task<int> GetStrings()
    {
        int count = await _context.Products.CountAsync();
        return count;
    }

    public async Task<EventData?> OnEvent(string eventid, ClientData data = default)
    {
        if (eventid != EVENTID)
            return null;
        
        int count = await GetStrings();
        
        EventData eventData = new EventData
            { Name = "Asasfas", StringCount = count };

        return eventData;
    }
}

public interface IGetStringsCount : IOnEventCallback
{
    Task<int> GetStrings();
}