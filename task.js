import * as React from 'react';
import { TextInput, Text, View, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class login extends React.Component{
  //construtor da classe
  constructor(props){
    super(props)
    this.state = {
      email: undefined,
      senha: undefined
    }
  }
  
  //função para ler os dados inseridos e verificar se o cliente existe para logar
  async ler() {
    try {
      //carrega os dados dos clientes
      const clienteData = await AsyncStorage.getItem(this.state.email);
      //verifica se os dados são diferentes de NULL
      if (clienteData != null) {
        //caarrega os dados de password, nome e cpf dos clientes
        const { password,nome ,cpf} = JSON.parse(clienteData);
        //verifica se as senhas digitas e email corresponde
        if (password === this.state.senha) {
          alert("Logado!!!");
          //armazena o nome do usuario
          await AsyncStorage.setItem("nomeUser", nome);
          //armazena cpf do usuario
          await AsyncStorage.setItem("cpfUser", cpf);
          //inicia o app principal
          this.props.navigation.replace('AppPrincipal');
        } else {
          alert("Senha Incorreta!");
        }
      } else {
        alert("Usuário não foi encontrado!");
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  //renderiza a pagina
  render(){
    return(
    <View style={styles.container}>
    <Image source={require('./LogoProjeto.png')} style={styles.imagem}/>
      <Text style={styles.texto}>{"E-mail:"}</Text>
      <TextInput style={styles.caixaText} onChangeText={(texto)=>this.setState({email: texto})}  
          autoCapitalize="none" 
          keyboardType="email-address" ></TextInput>
      <Text style={styles.texto}>{"Senha:"}</Text>
      <TextInput style={styles.caixaText} onChangeText={(password) => this.setState({ senha: password })}
          secureTextEntry={true} keyboardType="numeric"></TextInput>
      <TouchableOpacity 
          style={styles.botao} 
          onPress={()=>this.ler()}
        >
        <Text style={styles.botaoTexto}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.botao1} 
          onPress={()=> this.props.navigation.navigate('Cadastro')}
        >
        <Text style={styles.botaoTexto}>Cadastrar Usuario</Text>
      </TouchableOpacity>
      <Text style={{display: 'flex',marginTop: 300,fontFamily: 'bold', fontSize: 15,fontWeight: 'bold'}}>Developed By</Text>
      <Text style={{display: 'flex',marginTop: 0,fontFamily: 'bold', fontSize: 15,fontWeight: 'bold'}}>Rafael Dias</Text>
    </View>
    )
  }

}

class cadastro extends React.Component {
  //construtor da classe
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
      nome: "",
      cpf: ""
    };
  }

  //função utilizada para gravar o usuario
  async gravar() {
    const { email, senha, nome, cpf } = this.state;

    // Verifica se todos os campos foram preenchidos
    if (!email || !senha || !nome || !cpf ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    //verifica se cpf possui 11 digitos
    if(cpf.length !== 11){
      alert("CPF incorreto, deve conter 11 digitos !");
      return;
    }

    //verifica o tamanho minimo da senha
    if(senha.length < 5){
      alert("Senha pequena, no minimo 5 digitos");
      return;
    }

    try {
      // Verifica se o email já está cadastrado
      const emailExistente = await AsyncStorage.getItem(email);
      if (emailExistente) {
        alert("Email já cadastrado. Por favor, utilize um email diferente.");
        return;
      }

      // Verifica se o CPF já está cadastrado
      const cpfExistente = await AsyncStorage.getItem(cpf);
      if (cpfExistente) {
        alert("CPF já cadastrado. Por favor, utilize um CPF diferente.");
        return;
      }

      // Salva os dados do usuário no formato { password, nome, cpf }
      await AsyncStorage.setItem(email, JSON.stringify({ password: senha, nome, cpf }));
      await AsyncStorage.setItem(cpf, JSON.stringify({ email, password: senha, nome }));

      alert("Usuário Cadastrado com Sucesso!");

      // Limpa os campos do formulário
      this.setState({
        email: "",
        senha: "",
        nome: "",
        cpf: ""
      });
    } catch (erro) {
      alert("Erro ao cadastrar usuário!");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./LogoProjeto.png')} style={styles.imagem}/>


        <Text style={styles.texto}>Insira seu nome:</Text>
        <TextInput style={styles.caixaText} onChangeText={(texto) => this.setState({ nome: texto })}
          autoCapitalize="words" value={this.state.nome}/>

        <Text style={styles.texto}>Insira o seu CPF (Sem "." e "-"):</Text>
        <TextInput style={styles.caixaText} onChangeText={(texto) => this.setState({ cpf: texto })}
          keyboardType="numeric" value={this.state.cpf}/>

        <Text style={styles.texto}>Insira o seu E-mail:</Text>
        <TextInput style={styles.caixaText} onChangeText={(texto) => this.setState({ email: texto })}
          autoCapitalize="none" 
          keyboardType="email-address" value={this.state.email}/>

        <Text style={styles.texto}>Crie sua Senha:</Text>
        <TextInput style={styles.caixaText} onChangeText={(texto) => this.setState({ senha: texto })}
          secureTextEntry={true} keyboardType="numeric" value={this.state.senha}/>


        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => this.gravar()}
        >
          <Text style={styles.botaoTexto}>Cadastrar Usuario</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.botao1} 
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.botaoTexto}>Voltar</Text>
        </TouchableOpacity>
        <Text style={{display: 'flex',marginTop: 205,fontFamily: 'bold', fontSize: 15,fontWeight: 'bold'}}>Developed By</Text>
        <Text style={{display: 'flex',marginTop: 0,fontFamily: 'bold', fontSize: 15,fontWeight: 'bold'}}>Rafael Dias</Text>
      </View>
    );
  }
}

class PaginaTarefas extends React.Component {
  //construtor da classe
  constructor(props) {
    super(props);
    this.state = {
      tarefas: [],
      cpfUser: undefined
    };
  }

  //carrega o cpf do usuario logado e das tarefas
  async componentDidMount() {
    //carrega o CPF do usuário logado
    const cpfUser = await AsyncStorage.getItem("cpfUser");
    this.setState({ cpfUser }, () => this.carregarTarefas()); // Chama carregarTarefas após definir o CPF

    //Listaner para recarregar tarefas ao retornar para a tela
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.carregarTarefas();
    });
  }

  componentWillUnmount() {
    this.focusListener();
  }

  async carregarTarefas() {
    try {
      //carrega as tarefas salvas
      const tarefasSalvas = await AsyncStorage.getItem('tarefas');
      //tranforma as tarefas em uma array 
      const tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
      //filtra as tarefas por cpf e status diferente de concluidas
      const tarefasFiltradas = tarefas.filter(
        tarefa => tarefa.statusAtividade !== "Concluída" && tarefa.cpfUser === this.state.cpfUser
      );
      //muda o estado da variavel
      this.setState({ tarefas: tarefasFiltradas });
    } catch (error) {
      alert("Erro ao carregar tarefas.");
    }
  }

  //renderização da pagina
  render() {
    return (
      <ScrollView contentContainerStyle={{ padding: 16,flexGrow: 1  }} style={styles.container1}  >
      <Text>               </Text>
      <Text>               </Text>
      <Text>               </Text>
      <Text>               </Text>
      <Text style={{fontFamily: 'Bold',fontWeight: 'bold',fontSize: 25, marginBottom: 25,textAlign: 'center'}}>Tarefas</Text>
        {this.state.tarefas.map((tarefa) => (
          <View key={tarefa.id} style={styles.cardTarefa}>
            <Text style={styles.texto}>{tarefa.nomeAtividade}</Text>
            <Text style={styles.texto}>Prioridade:{tarefa.prioridade}</Text>
            <Text style={styles.texto}>Status:{tarefa.statusAtividade}</Text>
            <TouchableOpacity 
              style={styles.botao1} 
              onPress={() => this.props.navigation.navigate('DescricaoTarefa', tarefa)}
            >
              <Text style={styles.botaoTexto}>Ver Descrição</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => this.props.navigation.replace('Login')}
        >
          <Text style={styles.botaoTexto}>Sair</Text>
      </TouchableOpacity>
      </ScrollView>
    );
  }
}

//classe da descrição das tarefas 
class DescricaoTarefa extends React.Component {

  //função onde altera o status da atividade acessada para em andamento
  iniciarTarefa = async () => {
    //atualiza o status da atividade
    await this.atualizarStatus("Em andamento");
  };

  //função onde altera o status da atividade acessada para concluida
  concluirTarefa = async () => {
    //captura a data atual
    const dataConclusao = new Date().toLocaleDateString('pt-BR');
    //atualiza o status da tarefa
    await this.atualizarStatus("Concluída");
    //atualiza a data de conclusão da tarefa
    await this.atualizarData(dataConclusao);
    //retorna a pagina inicial
    this.props.navigation.goBack();
  };


  apagarTarefa = async () => {
    try {
      //obtem as tarefas salvas
      const tarefasSalvas = await AsyncStorage.getItem('tarefas');
      //transforma a tarefas em array 
      const tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
      //filtra as tarefas em formato de array pelo id da tarefa atual
      const novasTarefas = tarefas.filter(tarefa => tarefa.id !== this.props.route.params.id);
      //carrega novamente o array sem a tarefa do id filtrado
      await AsyncStorage.setItem('tarefas', JSON.stringify(novasTarefas));
      //exibe um alerta de tarefa apagada
      alert("Tarefa apagada!");
      this.props.navigation.goBack();
    } catch (error) {
      alert("Erro ao apagar tarefa.");
    }
  };

  // Função auxiliar para atualizar o status da tarefa no AsyncStorage
  atualizarStatus = async (novoStatus) => {
    try {
        //Carrega as tarefas salvas do AsyncStorage
        const tarefasSalvas = await AsyncStorage.getItem('tarefas');
        //Converte as tarefas salvas em array
        const tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
        //Atualiza o status da tarefa especificada
        const novasTarefas = tarefas.map(tarefa => {
            //Verifica se o ID da tarefa corresponde ao ID da tarefa atual
            if (tarefa.id === this.props.route.params.id) {
                //Retorna a tarefa com o status atualizado
                return { ...tarefa, statusAtividade: novoStatus };
            }
            // Retorna a tarefa inalterada se o ID não corresponder
            return tarefa;
        });
        //carrega o array atualizado no AsyncStorage com o novo status
        await AsyncStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  
        alert(`Tarefa marcada como ${novoStatus}`);
    } catch (error) {
        // Exibe uma mensagem de erro caso ocorra falha ao atualizar o status
        alert("Erro ao atualizar status da tarefa.");
    }
  };

  // Função auxiliar para atualizar a data de conclusão da tarefa no AsyncStorage
  atualizarData = async (novaData) => {
    try {
        //Carrega as tarefas salvas do AsyncStorage
        const tarefasSalvas = await AsyncStorage.getItem('tarefas');
        //Converte as tarefas salvas em array
        const tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
        //Atualiza a data da tarefa especificada
        const novasTarefas = tarefas.map(tarefa => {
            //Verifica se o ID da tarefa corresponde ao ID da tarefa atual
            if (tarefa.id === this.props.route.params.id) {
                //Retorna a tarefa com o status atualizado
                return { ...tarefa, dataConcluida: novaData };
            }
            // Retorna a tarefa inalterada se o ID não corresponder
            return tarefa;
        });
        //carrega o array atualizado no AsyncStorage com o novo status
        await AsyncStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  
    } catch (error) {
        // Exibe uma mensagem de erro caso ocorra falha ao atualizar o status
        alert("Erro ao atualizar a data da tarefa.");
    }
  };

  //renderiza a pagina de informações
  render() {

    //retorna as informações da tarefa escolhida
    const { nomeAtividade, descricao, prioridade, dataLimite, nomeCriador,dataCriacao, statusAtividade } = this.props.route.params;

    return (
      <View style={styles.container2}>
        <Text style={{fontFamily: 'Bold',fontWeight: 'bold',fontSize: 25, marginBottom: 25, marginTop: -250}}>Descrição da Tarefa</Text>
        <Text style={styles.texto}>Nome da Tarefa: {nomeAtividade}</Text>
        <Text style={styles.texto}>Descrição: {descricao}</Text>
        <Text style={styles.texto}>Prioridade: {prioridade}</Text>
        <Text style={styles.texto}>Data Criação: {dataCriacao}</Text>
        <Text style={styles.texto}>Data Limite: {dataLimite}</Text>
        <Text style={styles.texto}>Criador: {nomeCriador}</Text>
        <Text style={styles.texto}>Status: {statusAtividade}</Text>

        <TouchableOpacity 
          style={styles.botao} 
            onPress={this.concluirTarefa}
        >
          <Text style={styles.botaoTexto}>Concluir Tarefa</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.botao1} 
            onPress={this.iniciarTarefa}
        >
          <Text style={styles.botaoTexto}>Iniciar Tarefa</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.botao1} 
            onPress={this.apagarTarefa}
        >
          <Text style={styles.botaoTexto}>Apagar Tarefa</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.botaoTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


class PaginaCriar extends React.Component {
  //contrutor da tarefa
  constructor(props) {
    super(props);
    this.state = {
      nomeAtividade: "",
      descricao: "",
      prioridade: undefined,
      dataLimite: "",
      nomeCriador: undefined,
      statusAtividade: "Não iniciada",
      cpfUser: undefined,
      dataConcluida: "",
    };
  }

  // Carrega o nome do usuário logado ao entrar na página
  async componentDidMount() {
    try {
      const nomeUsuario = await AsyncStorage.getItem("nomeUser");
      const cpfUsuario = await AsyncStorage.getItem("cpfUser");
      if (nomeUsuario && cpfUsuario) {
        this.setState({ nomeCriador: nomeUsuario });
        this.setState({cpfUser: cpfUsuario});
      }
    } catch (error) {
      console.log("Erro ao carregar o nome do usuário:", error);
    }
  }

  criarTarefa = async () => {
    //da Set no estados das variaveis que possui os dados da tarefa
    const { nomeAtividade, descricao, prioridade, dataLimite, nomeCriador, cpfUser} = this.state;

    //verifica se todos os campos foram preenchidos
    if (!nomeAtividade || !descricao || !prioridade || !dataLimite || !nomeCriador || !cpfUser) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if(prioridade < 0 || prioridade > 10){
      alert("Prioridade incorreta, somente entre 1 a 10 !");
      return;
    }

    //gera um id aleatorio para cada tarefa entre 0 a 999999
    const idUnico = Math.floor(Math.random() * 1000000);

    //obtem a data atual
    const dataCriacao = new Date().toLocaleDateString('pt-BR');

    //cria o objeto da tarefa 
    const novaTarefa = {
      id: idUnico, // cria um id para a tarefa utilizando a data e hora atual
      nomeAtividade, //nome da atividade
      descricao, // descrição da atividade
      prioridade, // prioridade da atividade
      dataCriacao, // data atual da criação da atividade
      dataLimite, // data limite da atividade
      nomeCriador, // nome do criador da atividade
      statusAtividade: "Não iniciada", // status iniciado como não iniciada
      cpfUser
    };

    //Carrega as tarefas armazenadas
    try {
      const tarefasSalvas = await AsyncStorage.getItem('tarefas');

      //transformas as tarefas ja existentes em array
      const tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];

      //adiciona a atividade criada na array
      tarefas.push(novaTarefa);

      //salva a array atualizada novamente no AsyncStorage
      await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
      alert("Tarefa criada com sucesso!");
      this.setState({
        nomeAtividade: "",
        descricao: "",
        prioridade: "",
        dataLimite: ""
      });
      // Chama a função atualizarTarefas da PaginaTarefas
      this.props.atualizarTarefas();
      this.props.navigation.goBack();
    } catch (error) {
      
    }
  };

  //renderiza a pagina onde cria as tarefas
  render() {
    return (
      <View style={styles.container2}>
        <Text style={{fontFamily: 'Bold',fontWeight: 'bold',fontSize: 25, marginBottom: 25, }}>Criar Tarefa</Text>
        <Text style={styles.texto}>Nome da Atividade:</Text>
        <TextInput style={{borderColor: 'black',borderWidth: 2,borderRadius: 3,width: 250,height: 25,marginBottom: 10}}onChangeText={(texto) => this.setState({ nomeAtividade: texto })} value={this.state.nomeAtividade}/>

        <Text style={styles.texto}>Descrição da atividade:</Text>
        <TextInput style={{borderColor: 'black',borderWidth: 2,borderRadius: 3,width: 250,height: 25,marginBottom: 10}} onChangeText={(texto) => this.setState({ descricao: texto })} value={this.state.descricao}/>

        <Text style={styles.texto}>Prioridade da Atividade (1 - 10):</Text>
        <TextInput style={{borderColor: 'black',borderWidth: 2,borderRadius: 3,width: 250,height: 25,marginBottom: 10}} onChangeText={(texto) => this.setState({ prioridade: texto })} keyboardType="numeric" value={this.state.prioridade}/>

        <Text style={styles.texto}>Data Limite da Atividade</Text>
        <Text style={styles.texto}>(dd/mm/yyyy):</Text>
        <TextInput style={{borderColor: 'black',borderWidth: 2,borderRadius: 3,width: 250,height: 25,marginBottom: 10}} onChangeText={(texto) => this.setState({ dataLimite: texto })} value={this.state.dataLimite}/>


        <TouchableOpacity 
          style={styles.botao} 
            onPress={this.criarTarefa}
        >
          <Text style={styles.botaoTexto}>Criar Tarefa</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//classe das atividades concluidas
class paginaAtividadeConcluida extends React.Component {
  //construtor da classe
  constructor(props) {
    super(props);
    this.state = {
      tarefasConcluidas: [],
      cpfUser: undefined
    };
  }

  //Carrega as tarefas na pagina
 async componentDidMount() {
    //carrega o CPF do usuário logado
    const cpfUser = await AsyncStorage.getItem("cpfUser");
    this.setState({ cpfUser }, () => this.carregarTarefasConcluidas()); //chama carregarTarefas após definir o CPF

    // Listener para recarregar tarefas ao retornar para a tela
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.carregarTarefasConcluidas();
    });
  }

  componentWillUnmount() {
    this.focusListener();
  }

  async carregarTarefasConcluidas() {
    try {
      //carrega as tarefas salvas
      const tarefasSalvas = await AsyncStorage.getItem('tarefas');
      //tranforma as tarefas em um array
      const tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
      //filtra as tarefas por cpf e status concluida
      const tarefasFiltradas = tarefas.filter(
        tarefa => tarefa.statusAtividade === "Concluída" && tarefa.cpfUser === this.state.cpfUser
      );
      //altera o estado da variavel
      this.setState({ tarefasConcluidas: tarefasFiltradas });
    } catch (error) {
      alert("Erro ao carregar tarefas.");
    }
  }

  //renderiza a pagina de tarefas concluidas
  render() {
    return (
      <ScrollView contentContainerStyle={{ padding: 16,flexGrow: 1  }} style={styles.container1}  >
      <Text>               </Text>
      <Text>               </Text>
      <Text>               </Text>
      <Text>               </Text>
      <Text style={{fontFamily: 'Bold',fontWeight: 'bold',fontSize: 25, marginBottom: 25,textAlign: 'center'  }}>Tarefas Concluidas</Text>
        {this.state.tarefasConcluidas.map((tarefa) => (
          <View key={tarefa.id} style={styles.cardTarefa}>
            <Text style={styles.texto}>{tarefa.nomeAtividade}</Text>

            <TouchableOpacity 
              style={styles.botao1} 
                onPress={() => this.props.navigation.navigate('DescricaoTarefaConcluidas', tarefa)}
            >
              <Text style={styles.botaoTexto}>Ver Informações</Text>
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>
    );
  }
}

//classe onde possui a decrição das tarefas concluidas
class DescricaoTarefaConcluidas extends React.Component {


    apagarTarefa = async () => {
    try {
      //obtem as tarefas salvas
      const tarefasSalvas = await AsyncStorage.getItem('tarefas');
      //transforma a tarefas em array 
      const tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
      //filtra as tarefas em formato de array pelo id da tarefa atual
      const novasTarefas = tarefas.filter(tarefa => tarefa.id !== this.props.route.params.id);
      //carrega novamente o array sem a tarefa do id filtrado
      await AsyncStorage.setItem('tarefas', JSON.stringify(novasTarefas));
      //exibe um alerta de tarefa apagada
      alert("Tarefa apagada!");
      this.props.navigation.goBack();
    } catch (error) {
      alert("Erro ao apagar tarefa.");
    }
  };

  //renderiza a pagina
  render() {
    //retorna as informações da tarefa escolhida
    const { nomeAtividade, descricao, prioridade, dataLimite, dataCriacao,nomeCriador, statusAtividade, dataConcluida} = this.props.route.params;
    return (
      <View style={styles.container2}>
        <Text style={{fontFamily: 'Bold',fontWeight: 'bold',fontSize: 25, marginBottom: 25, marginTop: -300}}>Descrição da Tarefa</Text>
        <Text style={styles.texto}>Nome da Tarefa: {nomeAtividade}</Text>
        <Text style={styles.texto}>Descrição: {descricao}</Text>
        <Text style={styles.texto}>Prioridade: {prioridade}</Text>
        <Text style={styles.texto}>Data Criação: {dataCriacao}</Text>
        <Text style={styles.texto}>Data Limite: {dataLimite}</Text>
        <Text style={styles.texto}>Criador: {nomeCriador}</Text>
        <Text style={styles.texto}>Status: {statusAtividade}</Text>
        <Text style={styles.texto}>Data de Conclusão: {dataConcluida}</Text>

        <TouchableOpacity 
          style={styles.botao} 
            onPress={this.apagarTarefa}
        >
          <Text style={styles.botaoTexto}>Apagar Tarefa</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.botaoTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class App extends React.Component {
  //paginas utilizadas como stack
  render() {
    return (
      //cria a navegação de forma stack para as paginas
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={login} options={{headerShown: false}}/>
          <Stack.Screen name="Cadastro" component={cadastro} options={{headerShown: false}}/>
          <Stack.Screen name="AppPrincipal" component={AppPrincipal} options={{ headerShown: false }} />
          <Stack.Screen name="DescricaoTarefa" component={DescricaoTarefa} options={{  headerShown: false  }} />
          <Stack.Screen name="DescricaoTarefaConcluidas" component={DescricaoTarefaConcluidas} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

//classe do app principal
class AppPrincipal extends React.Component {
  //construtor da classe
  constructor(props) {
    super(props);
    this.tarefasRef = React.createRef();
  }

  //renderização das paginas do projeto em formato de tabNavigator
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          //nome no tabScreen
          name="Tarefas"
          //renderiza a pagina de tarefas de forma dinamica e adiciona dois props que permite acessar os metodos e propriedades da pagina e depois utiliza uma navigation para poder navegar na pagina
          component={PaginaTarefas}
          options={{
            tabBarIcon: ({size }) => (
              <MaterialCommunityIcons name="home-account" color={'#E2680C'} size={size} />
            ), headerShown: false
          }}
        />

        <Tab.Screen
          //nome no tabScreen
          name="Criar Tarefa"
          //renderiza a pagina de criar tarefas dinamicamente e adiciona um props a pagina onde carrega a tarefa criada na pagina referenciada
          children={() => <PaginaCriar atualizarTarefas={() => this.tarefasRef.current.carregarTarefas()} />}
          //opções adicionais no icone da pagina
          options={{
            tabBarIcon: ({ size }) => (
              <MaterialCommunityIcons name="account-details" color={'#E2680C'} size={size} />
            ),headerShown: false
          }}
        />

        <Tab.Screen
          //nome no tabScreen
          name="Tarefas Concluidas"
          //nome do componente
          component={paginaAtividadeConcluida}
          //opções adicionais no icone da pagina
          options={{
            tabBarIcon: ({  size}) => (
              <MaterialCommunityIcons name="check-circle-outline" color={'#E2680C'} size={size}/>
            ),headerShown: false
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default App;

//Estilos utilizados no projeto
const styles = StyleSheet.create({
  container: {
    marginBottom: 80,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container1: {
    flex: 1,
    backgroundColor: 'white',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  caixaText: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 3,
    width: 200,
    height: 25,
  },
  botao: {
    marginTop: 25,
    width: 200,
    height: 25,
    backgroundColor: '#E2680C', // Cor de fundo do botão
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 5, // Bordas arredondadas
    marginVertical: 3,
    alignSelf: 'center',
  },
  botao1: {
    width: 200,
    height: 25,
    backgroundColor: '#E2680C', // Cor de fundo do botão
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 5, // Bordas arredondadas
    marginVertical: 3,
  },
  botaoTexto: {
    color: 'white', // Cor do texto
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'bold',
  },
  texto: {
    fontFamily: 'bold',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5
  },
  imagem: {
    width: 350,     // Largura da imagem
    height: 180,    // Altura da imagem
    marginBottom: 60,
    marginTop: 150,
  },
  cardTarefa: {
    backgroundColor: 'white',     // Fundo branco para o cartão
    borderRadius: 8,              // Bordas arredondadas
    padding: 25,                  // Espaço interno
    marginVertical: 10,           // Espaço entre os cartões
    width: '70%',                 // Largura ajustada para ocupar quase a largura total
    shadowColor: '#000',          // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Offset da sombra
    shadowOpacity: 0.1,           // Opacidade da sombra
    shadowRadius: 4,              // Raio da sombra
    elevation: 2,                 // Elevação para sombra no Android
    alignSelf: 'center',          // Centraliza o cartão
  },
});
