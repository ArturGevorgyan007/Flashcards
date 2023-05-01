import { TestBed } from '@angular/core/testing';

import { FlashCardServiceService } from './flash-card-service.service';
import { Flashcard } from './Interfaces/Flashcard';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FlashCardServiceService', () => {
  let service: FlashCardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FlashCardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('FlashCardServiceService', () => {
  let service: FlashCardServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlashCardServiceService]
    });
    service = TestBed.inject(FlashCardServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all flashcards', () => {
    const mockFlashcards: Flashcard[] = [
      {id: 1, question: 'What is JavaScript?', answer: 'JavaScript is a high-level programming language.'},
      {id: 2, question: 'What is Angular?', answer: 'Angular is a platform for building web applications.'},
    ];
    service.getAllFlashCards().subscribe((data:any ) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockFlashcards);
    });
    const req = httpMock.expectOne(`${service.root}flashcard/showall`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFlashcards);
  });

  it('should add a flashcard', () => {
    const mockFlashcard: Flashcard = {id: 3, question: 'What is HTML?', answer: 'HTML is a markup language.'};
    service.addFlashCard(mockFlashcard).subscribe((data: any) => {
      expect(data).toEqual(mockFlashcard);
    });
    const req = httpMock.expectOne(`${service.root}flashcard/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockFlashcard);
  });

  it('should edit a flashcard', () => {
    const mockFlashcard: Flashcard = {id: 3, question: 'What is HTML?', answer: 'HTML is a markup language.'};
    service.editFlashCard(mockFlashcard).subscribe((data: any) => {
      expect(data).toEqual(mockFlashcard);
    });
    const req = httpMock.expectOne(`${service.root}flashcard/update`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockFlashcard);
  });

  it('should delete a flashcard', () => {
    const mockFlashcard: Flashcard = {id: 3, question: 'What is HTML?', answer: 'HTML is a markup language.'};
    service.deleteFlashCard(mockFlashcard).subscribe((data: any) => {
      expect(data).toEqual(mockFlashcard);
    });
    const req = httpMock.expectOne(`${service.root}flashcard/delete`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual(mockFlashcard);
  });

  
  it('should retrieve a flashcard by id', () => {
    const mockFlashcard = {
      id: 1,
      question: 'What is the capital of France?',
      answer: 'Paris'
    };
    const id = 1;

    service.getFlashCard(id).subscribe((flashcard: any) => {
      expect(flashcard).toEqual(mockFlashcard);
    });

    const req = httpMock.expectOne(`${service.root}${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFlashcard);
  });

  it('should retrieve a flashcard id by question', () => {
    const mockFlashcard = {
      id: 1,
      question: 'What is the capital of France?',
      answer: 'Paris'
    };
    const question = 'What is the capital of France?';

    service.getIdByQuestion(question).subscribe((id: any) => {
      expect(id).toEqual(mockFlashcard.id);
    });

    const req = httpMock.expectOne(`${service.root}${question}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFlashcard.id);
  });
});
