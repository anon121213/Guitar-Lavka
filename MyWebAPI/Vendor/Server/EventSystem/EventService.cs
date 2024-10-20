﻿using Microsoft.AspNetCore.Mvc;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.EventSystem.Events;

namespace MyWebAPI.Vendor.Server.EventSystem
{
    [Route("api/eventservice")]
    [ApiController]
    public class EventService : ControllerBase
    {
        private readonly List<IOnEventCallback> _eventCallbacks = new();
        private readonly ILogger<EventService> _logger;

        public EventService(ILogger<EventService> logger,
            IGetDataByIdService getDataById,
            IGetAllProducts allProducts,
            IGetProductsCount getProductsCount,
            IGetAllProductsByPrice getAllProductsByPrice,
            IGetProductsBySearch getProductsBySearch,
            IGetProductByType getProductByType,
            IGetMaxPrice getMaxPrice)
        {
            _logger = logger;
            _eventCallbacks.Add(getDataById);
            _eventCallbacks.Add(allProducts);
            _eventCallbacks.Add(getProductsCount);
            _eventCallbacks.Add(getAllProductsByPrice);
            _eventCallbacks.Add(getProductsBySearch);
            _eventCallbacks.Add(getProductByType);
            _eventCallbacks.Add(getMaxPrice);
        }
        
        private async Task<EventData?> RaiseEventFromClient(string id, ClientData data)
        {
            _logger.LogInformation($"Event {id} received");
            
            foreach (var callback in _eventCallbacks)
            {
                var eventData = await callback.OnEvent(id, data);
                
                if (eventData != null)
                    return eventData;
            }
            return null;
        }
        
        [HttpPost("payload-event/{id}")]
        public async Task<IActionResult> HandleEvent(string id, [FromBody] ClientData data)
        {
            try
            {
                _logger.LogInformation($"Handling event {id} {data}");
                
                var eventData = await RaiseEventFromClient(id, data);

                _logger.LogInformation(data.Search);
                
                return Ok(eventData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error handling event");
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "An error occurred while handling the event.");
            }
        }
    }

    public interface IOnEventCallback
    {
        Task<EventData?> OnEvent(string eventId, ClientData data = default);
    }
}
