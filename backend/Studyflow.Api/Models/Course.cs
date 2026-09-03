namespace Studyflow.Api.Models;

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Notes { get; set; }
    public enum Difficulty
    {
        Beginner,
        Intermediate,
        Advanced
    }
    public int Progress { get; set; }
}