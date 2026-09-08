using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Studyflow.Api.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Studyflow.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly CourseContext _context;

        public CoursesController(CourseContext context)
        {
            _context = context;
        }

        // GET: api/Courses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Unauthorized();
            }

            return await _context.Courses
                .Where(course => course.UserId == userId)
                .ToListAsync();
        }

        // GET: api/Courses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Unauthorized();
            }

            var course = await _context.Courses
                .FirstOrDefaultAsync(course =>
                    course.Id == id &&
                    course.UserId == userId
                );

            if (course is null)
            {
                return NotFound();
            }

            return course;
        }

        // PUT: api/Courses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, Course course)
        {
            if (id != course.Id)
            {
                return BadRequest();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Unauthorized();
            }

            var existingCourse = await _context.Courses
                .FirstOrDefaultAsync(existing =>
                    existing.Id == id &&
                    existing.UserId == userId
                );

            if (existingCourse is null)
            {
                return NotFound();
            }

            existingCourse.Title = course.Title;
            existingCourse.Notes = course.Notes;
            existingCourse.Difficulty = course.Difficulty;
            existingCourse.Progress = course.Progress;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Courses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(Course course)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Unauthorized();
            }

            course.UserId = userId;

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetCourse),
                new { id = course.Id },
                course
            );
        }

        // DELETE: api/Courses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Unauthorized();
            }

            var course = await _context.Courses
                .FirstOrDefaultAsync(course =>
                    course.Id == id &&
                    course.UserId == userId
                );

            if (course is null)
            {
                return NotFound();
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
