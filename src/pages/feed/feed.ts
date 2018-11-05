import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

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

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  public objeto_feed = {
    titulo: "Thomas Nogueira",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrivel...",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11 ago"
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Filmes...",
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  public lista_filmes = new Array<any>();
  public page = 1;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController) {
  }

  public somaDoisNumeros(num1: number, num2: number): void {
    alert(5 + 10);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newpage: boolean = false) {
    this.abreCarregando();
    this.movieProvider.getLatestMoovies(this.page).subscribe(
      data => {
        const response = (data as any); // Recebe qualquer coisa do objeto enviado pela api.
        const objeto_retorno = JSON.parse(response._body); // Transforma em JSON
        if(newpage){
          this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
          console.log(this.page);
          console.log(this.lista_filmes);
          this.infiniteScroll.complete();
        }else{
          this.lista_filmes = objeto_retorno.results;
        }
        console.log(objeto_retorno);
        this.fechaCarregando();
        if(this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.fechaCarregando();
      }
    )
  }

}
