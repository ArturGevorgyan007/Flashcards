using Microsoft.AspNetCore.Mvc;
using Services;
using DataAccess.Entities;

namespace API.Controllers;

[ApiController]
public class FlashCardController : ControllerBase
{
    private readonly FlashCardServices _service;

    public FlashCardController(FlashCardServices service)
    {
        _service = service;
    }

    [HttpPost]
    [Route("flashcard/create")]
    public List<Flashcard> Create(Flashcard flashcard)
    {
        _service.CreateFlashCard(flashcard);
        return _service.GetAll();
    }

    [HttpDelete]
    [Route("flashcard/delete")]
    public List<Flashcard> Delete(Flashcard flashcard)
    {
        _service.DeleteFlashCard(flashcard);
        return _service.GetAll();
    }

    [HttpPut]
    [Route("flashcard/update")]
    public List<Flashcard> Update(Flashcard flashcard)
    {
        _service.UpdateFlashCard(flashcard);
        return _service.GetAll();
    }

    [HttpGet]
    [Route("flashcard/showall")]
    public List<Flashcard> GetAll()
    {
        return _service.GetAll();
    }

    [HttpGet]
    [Route("flashcard/{id:int}")]
    public Flashcard GetById(int id)
        {
            return _service.GetById(id);
        }

    [HttpGet]
    [Route("getId/{question}")]
    public int GetBusinessTypeByEmail(string question)
    {
        return Int32.Parse(_service.GetById(question).Id);
    }
}
