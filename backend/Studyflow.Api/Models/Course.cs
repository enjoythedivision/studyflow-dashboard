namespace Studyflow.Api.Models;
public class Course
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Notes { get; set; }
    public string Difficulty { get; set; }
    public int Progress { get; set; }
}