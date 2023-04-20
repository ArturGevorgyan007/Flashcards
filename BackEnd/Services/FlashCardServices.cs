using DataAccess.Entities;

namespace Services;

public class FlashCardServices {
    private readonly FlashcardsDbContext _context;
    public FlashCardServices(FlashcardsDbContext context)
    {

        _context = context;

    }
    public Flashcard CreateFlashCard(Flashcard flashcard)
    {
        _context.Add(flashcard);

        _context.SaveChanges();
        // _context.ChangeTracker.Clear();
        return flashcard;
    }

    public Flashcard DeleteFlashCard(Flashcard flashcard)
    {
        _context.Remove(flashcard);
        _context.SaveChanges();
        return flashcard;
    }

    public Flashcard UpdateFlashCard(Flashcard flashcard)
    {
        _context.Update(flashcard);
        // _context.Flashcards.ToList();
        _context.SaveChanges();
        return flashcard;
    }

    public List<Flashcard> GetAll()
    {
        return _context.Flashcards.ToList();
    }

    public Flashcard GetById(int id)
    {
        return _context.Flashcards.FirstOrDefault(w => w.Id == id)!;
    }
}
