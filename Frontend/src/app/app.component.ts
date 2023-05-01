import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FlashCardServiceService } from './flash-card-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Flashcard } from './Interfaces/Flashcard';
import { OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'jqueryui';
import { AfterViewInit } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { TmplAstRecursiveVisitor } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked, AfterViewInit {
  constructor(private http: HttpClient, public service: FlashCardServiceService) {}
  title = 'Frontend';
  clickCounter = 0;
  showTable : boolean = false;
  listCards : any[] = []
  curId = 0
  closeWhat=""
  randCard : Flashcard ={id : 0,question :"", answer:""}
  validation : boolean = false
  validationError : string = ""
  
  ngOnInit() {
    this.getAllFlashcards()
    setTimeout(function(){ 
      var addModalEl = document.getElementById('addModal')
          addModalEl!.addEventListener('hidden.bs.modal', function (event) {
              (document.getElementById("myForm1") as HTMLFormElement).reset();
      })
       }, 100);
    setTimeout(function(){ 
    var editModalEl = document.getElementById('editModal')
        editModalEl!.addEventListener('hidden.bs.modal', function (event) {
            (document.getElementById("myForm") as HTMLFormElement).reset();
    })
      }, 100);
       this.validationError=""
       this.validation=true
  }

  ngAfterViewChecked() {
    this.validationError=""
  }

  ngAfterViewInit() {
    // this.validationError=""
  }

  flip() {
    const front = document.getElementById('front')!
    const back = document.getElementById('back')!
    const btn1 = document.getElementById('flip-btn')!
    const btn2 = document.getElementById('flip-btn2')!
    front.classList.toggle('is-flipped')
    back.classList.toggle('is-flipped')
    this.clickCounter++
    console.log(front.classList.contains('is-flipped'))
    console.log(back.classList.contains('is-flipped'))
  }

  addValidate() {
    let q=(<HTMLInputElement>document.getElementById("addQuestion")).value
    let a =(<HTMLInputElement>document.getElementById("addAnswer")).value
    if (q.length<5 || q.length>100) {
      this.validationError="Question length must be less than 5 and greater than 100 characters";
      this.validation=false
    }
    else if (q[q.length-1]!="?") {
      this.validationError="Question must end with question mark";
      this.validation=false
    }
    else
      this.validation=true
  }

  editValidate() {
    let q1=(<HTMLInputElement>document.getElementById("question")).value
    let a1=(<HTMLInputElement>document.getElementById("answer")).value
    if (q1.length<5 || q1.length>100 ) {
      this.validationError="Question length must be less than 5 and greater than 100 characters";
      this.validation=false
    }
    else if (q1[q1.length-1]!="?") {
      this.validationError="Question must end with question mark";
      this.validation=false
    }
    else
      this.validation=true
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




