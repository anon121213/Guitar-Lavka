using System.ComponentModel.DataAnnotations.Schema;

namespace MyWebAPI.Vendor.Server;

[Table("products")]

public class EventData
{
    public string EventId;
        
    [Column("id")]
    public int Id { get; set; }
    [Column("type")]
    public string Type { get; set; }
    [Column("name")]
    public string Name { get; set; }
    [Column("price")]
    public int Price { get; set; }
    [Column("rating")]
    public decimal Rating { get; set; }
    [Column("ratingcount")]
    public int RatingCount { get; set; }
}