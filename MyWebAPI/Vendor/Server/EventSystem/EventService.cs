using Microsoft.AspNetCore.Mvc;
using MyWebAPI.Vendor.Server.Data;
using MyWebAPI.Vendor.Server.EventSystem.Events;

namespace MyWebAPI.Vendor.Server
{
    [Route("api/eventservice")]
    [ApiController]
    public class EventService : ControllerBase
    {
        private readonly List<IOnEventCallback> _eventCallbacks = new();
        private readonly ILogger<EventService> _logger;

        public EventService(ILogger<EventService> logger,
            IGetDataService getData,
            IGetAllProducts allProducts,
            IGetStringsCount getStringsCount)
        {
            _logger = logger;
            _eventCallbacks.Add(getData);
            _eventCallbacks.Add(allProducts);
            _eventCallbacks.Add(getStringsCount);
        }
        

        private async Task<EventData?> RaiseEventFromClient(string id)
        {
            _logger.LogInformation($"Event {id} received");
            
            foreach (var callback in _eventCallbacks)
            {
                var data = await callback.OnEvent(id);
                _logger.LogInformation($"Event {callback} raised");
                if (data != null)
                    return data;
            }
            return null;
        }
        
        private async Task<EventData?> RaiseEventFromClient(string id, string? data)
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

        [HttpGet("handle-event/{id}")]
        public async Task<IActionResult> HandleEvent(string id)
        {
            try
            {
                _logger.LogInformation($"Handling event {id}");
                
                var data = await RaiseEventFromClient(id);
                
                _logger.LogInformation(data.Name);
                
                return Ok(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error handling event");
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "An error occurred while handling the event.");
            }
        } 
        
        [HttpGet("payload-event/{id}/{data}")]
        public async Task<IActionResult> HandleEvent(string id, string data)
        {
            try
            {
                _logger.LogInformation($"Handling event {id} {data}");
                
                var eventData = await RaiseEventFromClient(id, data);

                _logger.LogInformation(eventData.Name);
                
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
        Task<EventData?> OnEvent(string eventId, string? data = default);
    }
}
