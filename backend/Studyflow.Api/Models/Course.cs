using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Studyflow.Api.Models;

public class Course
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;
    
    public string? Notes { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Difficulty Difficulty { get; set; }

    [Range(0, 100)]
    public int Progress { get; set; }
}