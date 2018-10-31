import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
    titulo: "Thomas Nogueira",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrivel...",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11 ago"
  }

  public lista_filmes = new Array<any>();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider) {
  }

  public somaDoisNumeros(num1: number, num2: number): void {
    alert(5 + 10);
  }

  ionViewDidLoad() {
    this.movieProvider.getLatestMoovies().subscribe(
      data => {

        const response = (data as any); // Recebe qualquer coisa do objeto enviado pela api.
        const objeto_retorno = JSON.parse(response._body); // Transforma em JSON
        this.lista_filmes = objeto_retorno.results;
        
        console.log(objeto_retorno);
      }, error => {
        console.log(error);
      }
    )
  }

}
