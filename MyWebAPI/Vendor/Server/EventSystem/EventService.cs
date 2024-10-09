using Microsoft.AspNetCore.Mvc;

namespace MyWebAPI.Vendor.Server
{
    [Route("api/eventservice")]
    [ApiController]
    public class EventService : ControllerBase
    {
        private readonly List<IOnEventCallback> _eventCallbacks = new();
        private readonly ILogger<EventService> _logger;

        public EventService(ILogger<EventService> logger, IGetDataService getData)
        {
            _logger = logger;
            _eventCallbacks.Add(getData);
        }

        public void RegisterCallback(IOnEventCallback eventCallback) => 
            _eventCallbacks.Add(eventCallback);

        public void RemoveCallback(IOnEventCallback eventCallback) => 
            _eventCallbacks.Remove(eventCallback);

        private async Task<EventData?> RaiseEventFromClient(int id)
        {
           // _logger.LogInformation($"Event {eventData.EventId} received");
            
            foreach (var callback in _eventCallbacks)
            {
                var data = await callback.OnEvent(id);
                
                if (data != null)
                    return data;
            }
            return null;
        }

        [HttpGet("handle-event/{id}")]
        public async Task<IActionResult> HandleEvent(int id)
        {
            try
            {
                _logger.LogInformation($"Handling event {id}");
                
                var data = await RaiseEventFromClient(id);
                
                if (data != null)
                    return Ok(data.Name);
                
                return Ok("null");
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
        Task<EventData?> OnEvent(int eventId);
    }
}
