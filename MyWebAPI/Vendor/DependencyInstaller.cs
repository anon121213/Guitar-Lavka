using MyWebAPI.Vendor.Server;

namespace MyWebAPI.Vendor;

public class DependencyInstaller(WebApplicationBuilder _builder)
{
    public void RegisterDependencies()
    {
        _builder.Services.AddTransient<IGetDataService, GetDataService>();
    }
}