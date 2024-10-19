namespace MyWebAPI.Vendor.Server.Data;

public struct ClientData
{
    public bool IsStock { get; set; }
    public string Search { get; set; }
    public int MinPrice { get; set; }
    public int MaxPrice { get; set; }
    public int Type { get; set; }
}