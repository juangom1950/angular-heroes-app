import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  // We put it optional because when it is loaded by 1st hero doesn't have any value, it will be null
  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  // We are delaying here 3 sec to simulate an http request delay.
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(3000),
        switchMap( ({ id }) => this.heroesService.getHeroById( id )),
      )
      .subscribe( hero => {

        // If hero doesn't come in this answer then I take the user out of this screen.
        if ( !hero ) return this.router.navigate([ '/heroes/list' ]);

        this.hero = hero;
        // I need to add this return because otherwise we would get an error.
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('heroes/list')
  }

}
