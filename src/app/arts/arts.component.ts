import { Component, OnInit, ViewChild } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.component.html',
  styleUrls: ['./arts.component.scss']
})
export class ArtsComponent implements OnInit {

  @ViewChild('canvas_container', {static: false}) canvasContainer;
  p5;
  p;
  _img;
  _ff;
  _ffCount;
  constructor() {
    this._img;
    this._ff = [];
    this._ffCount = 20;
   }


  ngOnInit() {
    this.p5 = new p5((p) => {
      this.p = p;  
      p.setup = this.setup.bind(this);
      p.draw = this.draw.bind(this);
    }, this.canvasContainer);

  }


  setup() {
    this.p.createCanvas(600, 600);
    this.p.background(0);
    this.p.noStroke();
    this._img = this.imgSet(this.p.width, this.p.width);
    for (var i = 0; i < this._ffCount; i++) {
      this._ff[i] = new FfObj(this.p, this._img);
    }
  }

  draw() {
    this.p.background(0);
    for (var i = 0; i < this._ffCount; i++) {
      if (!this.p.mouseIsPressed) {
        this._ff[i].drawMe();
        
      } else {
        this._ff[i].drawMe();
      }
      this._ff[i].updateMe();
    }
  }

  imgSet(width, height) {
    let _img = this.p.createImage(width, height);
    _img.loadPixels();
    for (var i = 0; i < _img.width; i++) {
      for (var j = 0; j < _img.height; j++) {
        var pixAlpha = (255 / (this.p.dist(_img.width / 2, _img.height / 2, i, j) - 1)) * 1.47;
        if (pixAlpha < 0.94) {
          pixAlpha = 0;
        }
        _img.set(i, j, this.p.color(255, 255, 255, pixAlpha));
      }
    }
    _img.updatePixels();
    return _img;
  }
}



function FfObj(p, img) {
  this.p = p;
  this._img = img
  this.pX = this.p.random(0 - this._img.width / 2, this.p.width - this._img.width / 2);
  this.pY = this.p.random(0 - this._img.height / 2, this.p.height - this._img.height / 2);
  this.noiseX = this.p.random() * 1000;
  this.noiseY = this.p.random() * 1000;
  this.noiseScale = this.p.random(0.001, 0.02);
}

FfObj.prototype.updateMe = function() {
  
  this.pX += this.p.noise(this.noiseX) * 4 - 1.86;
  this.pY += this.p.noise(this.noiseY) * 4 - 1.86;
  if (this.pX < 0 - this._img.width / 2) {
    this.pX = 0 - this._img.width / 2;
  }
  if (this.pX > this.p.width - this._img.width / 2) {
    this.pX = this.p.width - this._img.width / 2;
  }
  if (this.pY < 0 - this._img.height / 2) {
    this.pY = 0 - this._img.height / 2;
  }
  if (this.pY > this.p.height - this._img.height / 2) {
    this.pY = this.p.height - this._img.height / 2;
  }
  this.noiseX += this.noiseScale;
  this.noiseY += this.noiseScale;
};

FfObj.prototype.drawMe = function() {
  this.p.image(this._img, this.pX, this.pY);
  this.p.fill(255, 255, 250, 255);
  this.p.ellipse(this.pX + this._img.width / 2, this.pY + this._img.height / 2, 5);
};