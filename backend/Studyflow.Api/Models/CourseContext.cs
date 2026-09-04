using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
namespace Studyflow.Api.Models;

public class CourseContext : IdentityDbContext<IdentityUser>
{
    public CourseContext(DbContextOptions<CourseContext> options)
        : base(options)
    {
    }

    public DbSet<Course> Courses { get; set; } = null!;
}