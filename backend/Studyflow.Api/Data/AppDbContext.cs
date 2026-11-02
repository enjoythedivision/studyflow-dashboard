using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.AspNetCore.WebUtilities;
using Npgsql;
namespace Studyflow.Api.Models;

public class AppDbContext : IdentityDbContext<IdentityUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Course> Courses { get; set; } = null!;

    public static string? GetConnectionString(IConfiguration configuration)
    {
        var value = configuration["DATABASE_URL"]
            ?? configuration.GetConnectionString("DefaultConnection");
        if (!Uri.TryCreate(value, UriKind.Absolute, out var uri)
            || uri.Scheme is not ("postgres" or "postgresql"))
            return value;

        var credentials = uri.UserInfo.Split(':', 2);
        if (credentials.Length != 2)
            throw new ArgumentException("The PostgreSQL URL must include a username and password.");

        var connection = new NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.Port < 0 ? 5432 : uri.Port,
            Database = Uri.UnescapeDataString(uri.AbsolutePath.TrimStart('/')),
            Username = Uri.UnescapeDataString(credentials[0]),
            Password = Uri.UnescapeDataString(credentials[1]),
            SslMode = SslMode.VerifyFull
        };

        foreach (var (key, setting) in QueryHelpers.ParseQuery(uri.Query))
        {
            var option = key.ToLowerInvariant() switch
            {
                "sslmode" => "SSL Mode",
                "channel_binding" => "Channel Binding",
                "connect_timeout" => "Timeout",
                "application_name" => "Application Name",
                "sslrootcert" => "Root Certificate",
                _ => key
            };
            connection[option] = option == "SSL Mode"
                ? setting.ToString().Replace("-", "") : setting.ToString();
        }
        return connection.ConnectionString;
    }
}

// EF commands can create migrations without starting the API.
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: true)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .AddUserSecrets<AppDbContextFactory>(optional: true)
            .AddEnvironmentVariables()
            .Build();
        return new AppDbContext(new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(AppDbContext.GetConnectionString(configuration))
            .Options);
    }
}
