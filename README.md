# TESK+ - Task Management Application
![image](https://github.com/user-attachments/assets/baa9fb2e-0069-4ead-a4ab-04885299fbae)


TESK+ é um aplicativo simples e intuitivo para gerenciamento de tarefas pessoais. Ele permite que o usuário organize suas atividades, visualize o progresso de cada tarefa e mantenha um controle das tarefas concluídas. Desenvolvido para facilitar a produtividade, TESK+ é acessível e funcional para todos que desejam gerenciar suas tarefas de maneira eficaz.

## Funcionalidades Principais

- **Página de Login**: Acesso seguro através de email e senha.
- **Página de Cadastro**: Criação de conta com informações básicas (nome, CPF e senha).
- **Página de Tarefas**: Visualização das atividades em andamento ou não iniciadas.
- **Página de Criação de Tarefas**: Cadastro de novas tarefas com informações detalhadas.
- **Página de Tarefas Concluídas**: Exibição de tarefas que foram finalizadas.
- **Página de Descrição de Tarefas**: Visualização completa das informações de uma tarefa, com opções para atualizar seu status, excluir ou retornar.

---

## Estrutura do Aplicativo

### 1. Página de Login
A página de login permite que o usuário acesse o TESK+ inserindo seu email e senha. Se o login for bem-sucedido, o usuário é redirecionado para a página principal do aplicativo, onde poderá visualizar suas tarefas.

![image](https://github.com/user-attachments/assets/80bc8486-ec9c-4e87-a702-3285b1b266d0)

### 2. Página de Cadastro
Na página de cadastro, o usuário cria uma conta inserindo as seguintes informações:
- **Email**: Para autenticação e identificação do usuário.
- **CPF**: Deve conter 11 dígitos (somente números, sem pontos ou traços).
- **Nome**: Nome completo do usuário.
- **Apelido**: Nome que o usuário gostaria de utilizar.
- **Senha**: Mínimo de 5 dígitos numéricos para segurança básica.

Após o cadastro, os campos são limpos automaticamente para que o usuário possa iniciar um novo cadastro ou acessar a página de login.

![image](https://github.com/user-attachments/assets/5e7f0323-a310-47be-b8c7-3786829cfe6e)


### 3. Página de Tarefas
A página de tarefas exibe todas as atividades do usuário que estão em andamento ou ainda não foram iniciadas. Cada tarefa aparece em um cartão com as seguintes informações:
- **Nome da Atividade**
- **Prioridade**: Um número de 1 a 10 indicando a urgência.
- **Status**: Iniciado, em andamento ou não iniciado.

Cada cartão de tarefa possui um botão "Ver Descrição", que leva o usuário a uma página com a descrição detalhada da tarefa. Há também um botão "Sair", que permite ao usuário deslogar do aplicativo.

![image](https://github.com/user-attachments/assets/7464df13-46cd-453f-a54e-ddde48879f0d)


### 4. Página de Criação de Tarefas
Nesta página, o usuário pode criar uma nova tarefa preenchendo os seguintes campos:
- **Nome da Tarefa**
- **Descrição**: Detalhes sobre a tarefa.
- **Prioridade**: Um número de 1 a 10 para indicar a prioridade.
- **Data Limite**: Prazo para a conclusão da tarefa.

Após preencher os campos, o usuário pode criar a tarefa, que será adicionada à lista de tarefas em andamento.

![image](https://github.com/user-attachments/assets/fb486d5c-745a-4915-a316-dd29114d28fd)


### 5. Página de Tarefas Concluídas
As tarefas finalizadas são exibidas nesta página, com cada tarefa em um cartão mostrando seu nome e um botão para acessar uma descrição detalhada. Isso ajuda o usuário a manter um histórico das tarefas já concluídas.

![image](https://github.com/user-attachments/assets/fcd6cdcd-7558-4ec6-a290-2c839c1282da)


### 6. Página de Descrição de Tarefas
Na descrição da tarefa, o usuário pode ver todos os detalhes da atividade, como:
- **Nome da Tarefa**
- **Descrição**
- **Data de Criação**
- **Data Limite**
- **Status**
- **Criador da Tarefa**

A página possui quatro botões:
1. **Iniciar Tarefa**: Altera o status da tarefa para "Em andamento".
2. **Concluir Tarefa**: Altera o status para "Concluída".
3. **Excluir Tarefa**: Remove a tarefa.
4. **Voltar**: Retorna à página de tarefas.

![image](https://github.com/user-attachments/assets/88a50bab-c839-4187-8873-db23caf22a9c)


### 7. Página de Descrição de Tarefas Concluídas
Aqui, o usuário pode visualizar informações completas sobre as tarefas que já foram concluídas, incluindo:
- **Nome da Tarefa**
- **Status**
- **Descrição**
- **Data de Criação**
- **Data Limite**
- **Data de Conclusão**
- **Criador da Tarefa**

Nesta página, há um botão para excluir a tarefa e outro para voltar à página de tarefas concluídas.

![image](https://github.com/user-attachments/assets/9b696cb5-4b5a-41b3-a223-faed308a37fc)


---

## Conclusão
TESK+ é ideal para qualquer pessoa que deseje organizar e acompanhar o progresso de suas atividades de maneira eficiente. Com uma interface simples e um conjunto de funcionalidades objetivas, o TESK+ ajuda o usuário a gerenciar suas tarefas de forma prática, proporcionando um aumento de produtividade e melhor controle do seu dia a dia.

IDE recomendada pra uso Expo.Go. Link para o stack do projeto: https://snack.expo.dev/@rafadias08/projeto-react
