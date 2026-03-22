## Full Stack Development - FIAP
## Tech Challenge – Fase 03


## Sobre o Projeto
Este projeto faz parte da Fase 03 da Pós-Tech FIAP e consiste no desenvolvimento de uma aplicação de blogging full stack, com frontend em Next.js/React e backend em Node.js/TypeScript. O objetivo é oferecer uma interface gráfica responsiva e intuitiva, permitindo que docentes e estudantes interajam com posts por meio de endpoints REST, com autenticação e autorização.


## Documentação Técnica
- Arquitetura: separação clara entre frontend e backend, comunicação via REST API.  
- Swagger: documentação automática da API em /docs.  
- CI/CD: workflows configurados em .github/workflows.  
- Docker: containerização com Dockerfile e orquestração com docker-compose.yml. 


## Tecnologias Utilizadas
- Frontend: Next.js, React, Context API, Styled Components, PostCSS  
- Backend: Node.js, Express, TypeScript, Prisma ORM  
- Banco de Dados: PostgreSQL (via Prisma)  
- Autenticação: JWT  
- Testes: Jest
- Documentação da API: Swagger
- Infraestrutura: Docker, Docker Compose, CI/CD com GitHub Actions


## Instalação e Execução
1. Clonar o repositório:  
   git clone https://github.com/IgorBR1/Projeto3-Fiap.git  
   cd PROJETO3-FIAP-MASTER  

2. Configurar o banco de dados:  
   cd backend/post-service  
   docker-compose up -d  

3. Configurar o backend:  
   cd backend/post-service  
   npm install  
   npm run dev  

4. Configurar o frontend:  
   cd frontend  
   npm install  
   npm run dev  

A aplicação estará disponível em:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Swagger: http://localhost:3001/docs

Observação: Existe a possibilidade do frontend ter sido configurado em outra porta diferente da 3000, verificar nos logs do terminal caso não esteja na 3000.


## Testes
Executar testes:  
   cd backend/post-service  
   npm run test  


## Endpoints
1. Endpoints de posts:

GET    /posts  
    Lista todos os posts  

GET    /posts/{id}  
    Retorna um post específico pelo ID  

POST   /posts  
    Cria um novo post (restrito a professores)  

PUT    /posts/{id}  
    Atualiza um post existente (restrito a professores)  

DELETE /posts/{id}  
    Exclui um post (restrito a professores)  

GET    /posts/search?keyword=palavra  
    Busca posts por palavra-chave  

GET    /posts/author/{authorId}  
    Retorna todos os posts de um autor específico  

2. Endpoints de usuários:

GET    /users  
    Lista todos os usuários  

GET    /users/{id}  
    Retorna um usuário pelo ID  

POST   /users  
    Cria um novo usuário  

PUT    /users/{id}  
    Atualiza um usuário existente  

DELETE /users/{id}  
    Exclui um usuário  

POST   /users/login  
    Realiza login de usuário  

3. Endpoints de autenticação:

POST   /login  
    Autenticação de professores  

POST   /register  
    Registro de novos usuários  


## Equipe
- Daniel Andrade – RM 369008  
- Fernando Paiva Sousa – RM 368172  
- Igor Brasil de Oliveira – RM 367864  
- João Batista Ferreira Junior – RM 368802
