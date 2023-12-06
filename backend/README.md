# Backend - Sistema de Agendamento de Doação de Sangue

Este projeto foi desenvolvido como parte do curso de Sistemas de Informação na Universidade Federal de Ouro Preto, especificamente na disciplina Sistemas Web I (CSI606). O objetivo principal deste trabalho é aplicar os conceitos apresentados ao longo do curso e colocá-los em prática.

## Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados na sua máquina.

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/UFOP-CSI477/csi606-2023-02-atividades-diogoleite87/tree/master/Atividades/atividade-pratica-01
   ```

2. **Instale as depêndencias:**
   ```bash
   npm install
   ```
3. **Crie um arquivo .env seguindo o exemplo do arquivo .env.example:**
   ```bash
   [user] # usuário do banco de dados
   [password] # senha do banco de dados
   [url] # url onde o banco esta sendo hospedado
   [port] # porta onde o banco esta exposto
   [namedb] # nome do banco de dados
   ```
4. **Execute a migrate:**

   ```bash
   npx prisma mirate dev --name [nome da migrate] # nome apenas para referência
   ```

5. **Por último, execute o server:**
   ```bash
   npm run dev # servidor sera executado na porta disponível
   ```

### Observações

O Prisma foi configurado para utilizar o PostgreSQL; no entanto, caso deseje realizar mudanças, o processo é relativamente simples. Consulte a [documentação oficial do Prisma](https://www.prisma.io/docs/) para obter orientações detalhadas.
