using MyWebAPI.Vendor.Server.EventSystem.Events;

namespace MyWebAPI.Vendor.Installers;

public class DependencyInstaller(WebApplicationBuilder _builder)
{
    public void RegisterDependencies()
    {
        _builder.Services.AddTransient<IGetDataByIdService, GetDataByIdByIdService>();
        _builder.Services.AddTransient<IGetStringsCount, GetStringsCount>();
        _builder.Services.AddTransient<IGetAllProducts, GetAllProducts>();
        _builder.Services.AddTransient<IGetProductsByDiapasonePrice, GetProductsByRangePrice>();
        _builder.Services.AddTransient<IGetAllProductsByPrice, GetAllProductsByPrice>();
        _builder.Services.AddTransient<IGetProductsBySearch, GetProductsBySearch>();
        _builder.Services.AddTransient<IGetProductByType, GetProductByType>();
    }
}