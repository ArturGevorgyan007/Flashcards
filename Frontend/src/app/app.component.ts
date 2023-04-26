import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FlashCardServiceService } from './flash-card-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Flashcard } from './Interfaces/Flashcard';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private service: FlashCardServiceService, private formBuilder: FormBuilder) {}
  title = 'Frontend';
  clickCounter = 0;
  showTable : boolean = false;
  listCards : any[] = []
  curId = 0
  closeWhat=""
  randCard : Flashcard ={id : 0,question :"", answer:""}
  validation : boolean = false
  
  ngOnInit() {
    this.getAllFlashcards()
  }

  flip() {
    const front = document.getElementById('front')!
    const back = document.getElementById('back')!
    const btn1 = document.getElementById('flip-btn')!
    const btn2 = document.getElementById('flip-btn2')!
    front.classList.toggle('is-flipped')
    back.classList.toggle('is-flipped')
    this.clickCounter++
  }

  validate() {
    
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  randomCard(){
    if (this.clickCounter%2==1)
      this.flip()
    this.getAllFlashcards()
  }

  showAllCards() {
    this.getAllFlashcards()
    this.showTable=true;
  }

  getAllFlashcards(){
    this.service.getAllFlashCards().subscribe(data=> {
      console.log(data)
      this.listCards=data as any
      this.randCard = this.listCards[this.getRandomInt(this.listCards.length)]
    })
  }

  editCard(e: Event) {
    let q=(<HTMLInputElement>document.getElementById("question")).value
    let a =(<HTMLInputElement>document.querySelector("#answer")).value
    let cardToEdit : Flashcard = {
      id: this.curId,
      question: q,
      answer: a
    }
    this.service.editFlashCard(cardToEdit).subscribe(data => {
      this.getAllFlashcards(); 
      this.closeWhat="Modal";
    });
    (<HTMLInputElement>document.getElementById("question")).value="";
    (<HTMLInputElement>document.getElementById("answer")).value="";
  }

  deleteCard(e: Event) {
    let clickedElement = <HTMLElement>e.target;
    let clickedRow = clickedElement.parentElement?.parentElement?.innerText;
    let cardToDelete : Flashcard = {
      id: parseInt(clickedRow?.split("\t")[0]!),
      question: clickedRow?.split("\t")[1]!,
      answer: clickedRow?.split("\t")[2]!
    }
    console.log(cardToDelete)
    this.service.deleteFlashCard(cardToDelete).subscribe(data => {this.getAllFlashcards();});
  }

  getId(e: Event) {
    let clickedElement = <HTMLElement>e.target;
    let clickedRow = clickedElement.parentElement?.parentElement?.innerText;
    // console.log(clickedRow)
    
    this.curId=parseInt(clickedRow?.split("\t")[0]!)
  }

  addCard(e: Event) {
    let q=(<HTMLInputElement>document.getElementById("addQuestion")).value
    let a =(<HTMLInputElement>document.getElementById("addAnswer")).value
    let cardToAdd : Flashcard = {
      id: undefined,
      question: q,
      answer: a
    }
    this.service.addFlashCard(cardToAdd).subscribe(data => {
      this.getAllFlashcards(); 
      this.closeWhat="Modal";
    });
    (<HTMLInputElement>document.getElementById("addQuestion")).value="";
    (<HTMLInputElement>document.getElementById("addAnswer")).value="";
  }

}


