import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FlashCardServiceService } from './flash-card-service.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });
  
  // afterEach(() => {
  //   httpMock.verify();
  // });

  
  // it('should edit flashcard and call getAllFlashcards()', async () => {
  //   fixture.detectChanges();
  //   // Arrange
  //   const mockCardToEdit = {
  //     id: 1,
  //     question: 'Test question',
  //     answer: 'Test answer'
  //   };
  //   const serviceSpy = spyOn(component.service, 'editFlashCard').and.returnValue(of(mockCardToEdit));
  //   const getAllFlashcardsSpy = spyOn(component, 'getAllFlashcards');
  //   const questionInput = fixture.nativeElement.querySelector('#question');
  //   const answerInput = fixture.nativeElement.querySelector('#answer');

  //   // Act
  //   questionInput.value = 'Edited question';
  //   questionInput.dispatchEvent(new Event('input'));
  //   answerInput.value = 'Edited answer';
  //   answerInput.dispatchEvent(new Event('input'));
  //   const editButton = fixture.nativeElement.querySelector('#edit-button');
  //   editButton.click();
  //   await fixture.whenStable();

  //   // Assert
  //   expect(serviceSpy).toHaveBeenCalledWith(mockCardToEdit);
  //   expect(getAllFlashcardsSpy).toHaveBeenCalled();
  //   expect(questionInput.value).toBe('');
  //   expect(answerInput.value).toBe('');
  // });

  it('should set randCard to a random card from the server response', () => {
    appComponent = TestBed.createComponent(AppComponent).componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    const mockResponse = [{ id: 1, question: 'Question 1', answer: 'Answer 1' }, { id: 2, question: 'Question 2', answer: 'Answer 2' }];
    appComponent.getAllFlashcards();

    const request = httpMock.expectOne('https://flashcardsapi.azurewebsites.net/flashcard/showall');
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);

    expect(appComponent.listCards).toEqual(mockResponse);
    expect(appComponent.randCard).toBeDefined();
    expect(appComponent.listCards).toContain(appComponent.randCard);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Frontend');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('Frontend app is running!');
  // });
  
});

describe('flip', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle the "is-flipped" class on front and back elements', () => {
    const front = document.createElement('div');
    front.id = 'front';
    document.body.appendChild(front);

    const back = document.createElement('div');
    back.id = 'back';
    document.body.appendChild(back);

    component.clickCounter = 0;
    component.flip();

    expect(front.classList.contains('is-flipped')).toBeFalse();
    expect(back.classList.contains('is-flipped')).toBeFalse();
  });

  it('should increment the click counter', () => {
    component.clickCounter = 0;
    component.flip();

    expect(component.clickCounter).toBe(1);
  });

  
  it('should return an integer between 0 and max-10', () => {
    const max = 10;
    const randomInt = component.getRandomInt(max);
    expect(Number.isInteger(randomInt)).toBeTrue();
    expect(randomInt).toBeGreaterThanOrEqual(0);
    expect(randomInt).toBeLessThan(max);
  });

});

describe('AppComponent', () => {
  let component: AppComponent;
  let service: FlashCardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [FlashCardServiceService],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FlashCardServiceService);
  });

describe('addCard', () => {
  it('should call service to add flashcard and reset form values', () => {
    const questionInput = document.createElement('input');
    questionInput.id = 'addQuestion';
    questionInput.value = 'What is your name?';
    document.body.appendChild(questionInput);

    const answerInput = document.createElement('input');
    answerInput.id = 'addAnswer';
    answerInput.value = 'My name is John Doe.';
    document.body.appendChild(answerInput);

    const cardToAdd = {
      id: undefined,
      question: 'What is your name?',
      answer: 'My name is John Doe.',
    };

    const getAllFlashcardsSpy = spyOn(component, 'getAllFlashcards');
    const addFlashCardSpy = spyOn(service, 'addFlashCard').and.returnValue(of({}));

    component.addCard({} as Event);

    expect(getAllFlashcardsSpy).toHaveBeenCalled();
    expect(component.closeWhat).toBe('Modal');
  });
});
});

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [FlashCardServiceService],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  describe('getId', () => {
    it('should set the current id to the id of the clicked row', () => {
      
      const clickedRow = document.createElement('tr');
      clickedRow.innerHTML = '<td>1</td><td>What is your name?</td><td>My name is John Doe.</td><td><img></td>';
      document.body.appendChild(clickedRow);

      const e = { target: clickedRow.lastChild?.lastChild } as Event;
      
      component.getId(e);

      expect(component.curId).toBe(1);
    });
  });
});

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [ FlashCardServiceService ],
      imports: [ HttpClientTestingModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get all flashcards when clickCounter is odd', () => {
    // Arrange
    spyOn(component, 'flip');
    spyOn(component, 'getAllFlashcards');
    component.clickCounter = 1;

    // Act
    component.randomCard();

    // Assert
    expect(component.flip).toHaveBeenCalled();
    expect(component.getAllFlashcards).toHaveBeenCalled();
  });

  it('should call flip and get all flashcards when clickCounter is even', () => {
    // Arrange
    spyOn(component, 'flip');
    spyOn(component, 'getAllFlashcards');
    component.clickCounter = 2;

    // Act
    component.randomCard();

    // Assert
    expect(component.flip).not.toHaveBeenCalled();
    expect(component.getAllFlashcards).toHaveBeenCalled();
  });
});

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: FlashCardServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(FlashCardServiceService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('showAllCards', () => {
    it('should call getAllFlashcards and set showTable to true', () => {
      spyOn(component, 'getAllFlashcards');
      component.showAllCards();
      expect(component.getAllFlashcards).toHaveBeenCalled();
      expect(component.showTable).toBeTrue();
    });
  });
});



