using MyWebAPI.Vendor.Server;
using MyWebAPI.Vendor.Server.EventSystem.Events;

namespace MyWebAPI.Vendor;

public class DependencyInstaller(WebApplicationBuilder _builder)
{
    public void RegisterDependencies()
    {
        _builder.Services.AddTransient<IGetDataService, GetDataService>();
        _builder.Services.AddTransient<IGetStringsCount, GetStringsCount>();
        _builder.Services.AddTransient<IGetAllProducts, GetAllProducts>();
    }
}