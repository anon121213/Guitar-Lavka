using System.ComponentModel.DataAnnotations.Schema;

namespace MyWebAPI.Vendor.Server.Data;

[Table("products")]

public class EventData
{
    public string EventId;

    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; }
    
    [Column("type")]
    public string Type { get; set; }
    
    [Column("price")]
    public int Price { get; set; }
    
    [Column("sale_price")]
    public int SalePrice { get; set; }
    
    [Column("rating")]
    public double Rating { get; set; }
    
    [Column("rating_preople_count")]
    public int RatingCount { get; set; }
    
    [Column("image_link")]
    public string ImageLink { get; set; }
    
    [Column("is_stock")]
    public bool IsStock { get; set; }
    
    [NotMapped]
    public int StringCount { get; set; }
    
    [NotMapped]
    public List<EventData> AllProducts { get; set; } = new();
}