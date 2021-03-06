import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User

  confirmarSenha: string //variável que que armazena o valor do input
  tipoUsuario: string

  constructor(
    private authService: AuthService, //injeção de dependencia: o modulo de cadastrar depende do authService para fazer o cadastro.
    private router: Router, //essa injeção de dependencia para rota interna direciona o usuario de cadastro para entrar.
    private alertas: AlertasService
    ) { }
  

  ngOnInit(){
    window.scroll(0,0)
  }

  confirmSenha(event: any){     //método de confirmação de senha, recebendo um evento do tipo any
    this.confirmarSenha = event.target.value  //pega o que estiver no valor do input e coloca para o confirmar senha
  }
  tipoUser(event:any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
      this.alertas.showAlertSuccess('As senhas estão incorretas.')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User)=>{ 
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
      })  // this.authService.cadastrar pega os usuarios dos inputs nas ngModels e mandar p o servidor, o subscribe vai sobrescrever esses inputs q são objetos (e não json).
    }

  }

}
