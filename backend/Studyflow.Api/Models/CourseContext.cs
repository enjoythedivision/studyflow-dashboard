using Microsoft.EntityFrameworkCore;

namespace Studyflow.Api.Models;

public class CourseContext : DbContext
{
    public CourseContext(DbContextOptions<CourseContext> options)
        : base(options)
    {
    }

    public DbSet<Course> Courses { get; set; } = null!;
}