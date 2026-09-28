# Εξήγηση του CoursesController.cs

Το αρχείο [`CoursesController.cs`](backend/Studyflow.Api/Controllers/CoursesController.cs) δέχεται τα αιτήματα του frontend για τα μαθήματα και διαβάζει ή αλλάζει τα δεδομένα στη βάση.

Υποστηρίζει τις λειτουργίες **CRUD**: δημιουργία, ανάγνωση, ενημέρωση και διαγραφή. Βασικός κανόνας του είναι ότι **κάθε χρήστης έχει πρόσβαση μόνο στα δικά του μαθήματα**.

## 1. Η δήλωση του controller

```csharp
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CoursesController : ControllerBase
```

- `[Authorize]`: απαιτεί πιστοποιημένο χρήστη για όλες τις μεθόδους.
- `[Route("api/[controller]")]`: ορίζει τη διεύθυνση `api/Courses`. Το `[controller]` αντικαθίσταται από το όνομα της κλάσης χωρίς το `Controller`.
- `[ApiController]`: ενεργοποιεί συμπεριφορές για API, όπως αυτόματες απαντήσεις σε σφάλματα επικύρωσης του μοντέλου.
- `ControllerBase`: παρέχει βοηθητικές μεθόδους απάντησης, όπως `NotFound()` και `Unauthorized()`.

## 2. Η σύνδεση με τη βάση

```csharp
private readonly CourseContext _context;

public CoursesController(CourseContext context)
{
    _context = context;
}
```

Το `_context` είναι το αντικείμενο μέσω του οποίου ο controller επικοινωνεί με τη βάση χρησιμοποιώντας **Entity Framework Core**.

Το ASP.NET Core το παρέχει στον constructor μέσω **dependency injection**: ο controller δεν χρειάζεται να το δημιουργήσει μόνος του.

Το `readonly` σημαίνει ότι το πεδίο δεν μπορεί να πάρει άλλο αντικείμενο μετά την κατασκευή του controller. Τα δεδομένα που διαχειρίζεται μπορούν κανονικά να αλλάζουν.

## 3. Πώς αναγνωρίζει τον χρήστη

Σχεδόν κάθε μέθοδος ξεκινά με:

```csharp
var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

if (userId is null)
{
    return Unauthorized();
}
```

Το `User` περιέχει την ταυτότητα του πιστοποιημένου χρήστη. Από εκεί διαβάζει το claim `NameIdentifier`, δηλαδή το αναγνωριστικό του.

Αν λείπει, επιστρέφει **401 Unauthorized**. Αυτός είναι πρόσθετος έλεγχος πέρα από το `[Authorize]`: η πιστοποίηση από μόνη της δεν εγγυάται ότι υπάρχει το συγκεκριμένο claim.

## 4. Οι πέντε λειτουργίες

| Μέθοδος | Αίτημα | Λειτουργία |
|---|---|---|
| `GetCourses()` | `GET /api/Courses` | Επιστρέφει όλα τα μαθήματα του χρήστη |
| `GetCourse(id)` | `GET /api/Courses/5` | Επιστρέφει ένα συγκεκριμένο μάθημα |
| `PostCourse(course)` | `POST /api/Courses` | Δημιουργεί μάθημα |
| `PutCourse(id, course)` | `PUT /api/Courses/5` | Ενημερώνει μάθημα |
| `DeleteCourse(id)` | `DELETE /api/Courses/5` | Διαγράφει μάθημα |

### GetCourses() — λίστα μαθημάτων

```csharp
return await _context.Courses
    .Where(course => course.UserId == userId)
    .ToListAsync();
```

Το `Where` περιορίζει το ερώτημα στα μαθήματα του τρέχοντος χρήστη. Το `ToListAsync()` εκτελεί το ερώτημα και επιστρέφει λίστα.

Αν δεν υπάρχουν μαθήματα, επιστρέφεται κενή λίστα `[]`.

### GetCourse(int id) — ένα μάθημα

```csharp
var course = await _context.Courses
    .FirstOrDefaultAsync(course =>
        course.Id == id &&
        course.UserId == userId
    );
```

Ψάχνει μάθημα που έχει **και το ζητούμενο ID και τον σωστό ιδιοκτήτη**.

Το `FirstOrDefaultAsync()` επιστρέφει το πρώτο αποτέλεσμα ή `null`. Αν είναι `null`, η μέθοδος απαντά **404 Not Found**. Άρα, ακόμη κι αν υπάρχει μάθημα με αυτό το ID αλλά ανήκει σε άλλον χρήστη, δεν επιστρέφεται.

### PutCourse(int id, Course course) — ενημέρωση

Το `id` προέρχεται από το URL, ενώ το `course` από το σώμα του αιτήματος, συνήθως JSON.

Αρχικά ελέγχει:

```csharp
if (id != course.Id)
{
    return BadRequest();
}
```

Για παράδειγμα, αίτημα στο `/api/Courses/5` με `"id": 8` στο σώμα απορρίπτεται με **400 Bad Request**.

Έπειτα βρίσκει το υπάρχον μάθημα του χρήστη και αντιγράφει μόνο αυτά τα πεδία:

```csharp
existingCourse.Title = course.Title;
existingCourse.Notes = course.Notes;
existingCourse.Difficulty = course.Difficulty;
existingCourse.Progress = course.Progress;
```

Δεν αλλάζει τον ιδιοκτήτη ή το ID. Το Entity Framework παρακολουθεί το `existingCourse`, οπότε:

```csharp
await _context.SaveChangesAsync();
```

αποθηκεύει τις αλλαγές. Η απάντηση είναι **204 No Content**: επιτυχία χωρίς σώμα απάντησης.

### PostCourse(Course course) — δημιουργία

```csharp
course.UserId = userId;

_context.Courses.Add(course);
await _context.SaveChangesAsync();
```

Ο server ορίζει ως ιδιοκτήτη τον τρέχοντα χρήστη, ανεξάρτητα από το `UserId` που μπορεί να έστειλε το frontend.

Το `Add()` σημειώνει το αντικείμενο για εισαγωγή. Το `SaveChangesAsync()` πραγματοποιεί την αποθήκευση.

```csharp
return CreatedAtAction(
    nameof(GetCourse),
    new { id = course.Id },
    course
);
```

Επιστρέφει **201 Created**, το νέο μάθημα και ένα `Location` header με τη διεύθυνση από την οποία μπορεί να ανακτηθεί, π.χ. `/api/Courses/12`.

### DeleteCourse(int id) — διαγραφή

Βρίσκει πρώτα το μάθημα ελέγχοντας και την ιδιοκτησία. Αν υπάρχει:

```csharp
_context.Courses.Remove(course);
await _context.SaveChangesAsync();

return NoContent();
```

Το `Remove()` το σημειώνει για διαγραφή και το `SaveChangesAsync()` εφαρμόζει τη διαγραφή στη βάση. Επιστρέφει **204 No Content**.

## 5. Τι σημαίνουν async, Task και ActionResult

Για παράδειγμα:

```csharp
public async Task<ActionResult<Course>> GetCourse(int id)
```

- `async` και `await`: επιτρέπουν την αναμονή της βάσης χωρίς να δεσμεύεται το thread σε όλη τη διάρκειά της.
- `Task`: αναπαριστά την ασύγχρονη εργασία.
- `ActionResult<Course>`: η απάντηση μπορεί να περιέχει ένα `Course` ή ένα HTTP αποτέλεσμα, όπως `404`.
- `IActionResult`: χρησιμοποιείται εδώ όταν η μέθοδος επιστρέφει αποτελέσματα όπως `204`, `400` ή `404`, χωρίς συγκεκριμένο μοντέλο επιτυχίας.

Όταν, για παράδειγμα, το frontend ζητά `GET /api/Courses/5`, η ροή είναι: **έλεγχος πιστοποίησης → ανάγνωση user ID → αναζήτηση μαθήματος που ανήκει στον χρήστη → επιστροφή JSON ή 404**.
