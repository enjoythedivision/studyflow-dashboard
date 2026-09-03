using System.ComponentModel.DataAnnotations;
namespace Studyflow.Api.Models;

public class Course
{
    public int Id { get; set; }

    public required string Title { get; set; }

    public string? Notes { get; set; }

    [Range(0, 100)]
    public int Progress { get; set; }
}