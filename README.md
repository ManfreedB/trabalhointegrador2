# Projeto Integrador - Sistema de Gestão Empresarial

## Integrantes do Projeto
- **Thiago Spanevello** (2311100016)  
- **Vitor Bach** (2311100063)  
- **Manfreed Britzke** (2311100058)  

## Descrição do Sistema
O sistema desenvolvido tem como objetivo facilitar a gestão empresarial, oferecendo funcionalidades específicas para o gerenciamento de funcionários, clientes, serviços prestados e pagamentos. Foi projetado com base nas necessidades identificadas junto à empresa cliente, conforme entrevista e análise de requisitos.

### Funcionalidades Principais
1. **Cadastro de Empresas**:  
   - A empresa realiza seu cadastro e recebe uma conta padrão de administrador (**admin@nome-empresa**) com a senha cadastrada.

2. **Gestão de Funcionários**:  
   - O administrador pode cadastrar funcionários com os seguintes tipos:  
     - **Gerente**: Permissões semelhantes ao administrador, exceto a criação de novos gerentes.  
     - **Funcionário Comum**: Pode cadastrar apenas serviços e pagamentos.  

3. **Cadastro de Clientes e Serviços**:  
   - Possibilidade de cadastrar empresas clientes e os tipos de serviços prestados.  
   - Registro dos serviços efetivamente prestados para clientes.  

4. **Gestão de Pagamentos**:  
   - Cadastro e gerenciamento de pagamentos relacionados aos serviços.  
   - O pagamento é considerado "fechado" após a emissão de um boleto ou nota fiscal, impedindo alterações futuras.  
   - Pagamentos são realizados sempre em **uma única parcela**, eliminando a necessidade de controle de múltiplas parcelas.  

## Requisitos Técnicos

### Requisitos Funcionais
- Gerenciamento de contas de empresas e usuários (admin, gerente e funcionário).
- Controle de cadastro e edição de empresas clientes.
- Registro de serviços prestados.
- Emissão de pagamentos relacionados aos serviços prestados.

### Requisitos Não-Funcionais
- Interface intuitiva e responsiva, garantindo boa experiência do usuário.  
- Utilização de tecnologias modernas e confiáveis para o desenvolvimento.

## Tecnologias Utilizadas
- **Framework**: React.js
- **Linguagem de Programação**: JavaScript
- **Estilização**: CSS
- **Banco de Dados**: Escolhido para persistência dos dados (não especificado aqui).  

## Estrutura do Projeto
- **Especificações e Documentação**:
  - Detalhes sobre os requisitos funcionais, não-funcionais, e diagrama de casos de uso podem ser acessados no arquivo:  
    `\Projeto-Integrador\specifications\specifications.pdf`  
  - O modelo conceitual do sistema está disponível em:  
    `\Projeto-Integrador\specifications\BRmodelo`.

## Executando o Projeto

### Pré-Requisitos
Certifique-se de ter instalado:
- **Node.js** (versão LTS recomendada)  
- **Gerenciador de pacotes**:  yarn  


### Passos para Execução
1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd projeto-integrador/front-end

2. **Inicie o projeto**:
    yarn start

3. **O projeto está disponível em http://localhost:3000**