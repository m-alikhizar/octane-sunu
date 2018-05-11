import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.css']
})

export class RadioInputComponent implements OnInit {

  @Input() text;

  @Input() checked;

  constructor() { }

  ngOnInit() { }

}
