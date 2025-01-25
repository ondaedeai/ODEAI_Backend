export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MATC84-LABORATORIO-DE-PROGRAMACAO-WEB",
      description: "Projeto MATC84",
      version: "1.0.0",
    },
    servers: [
      {
        url: "{protocol}://{host}",
        description: "Servidor Dinâmico",
        variables: {
          protocol: {
            default: "http",
            enum: ["http", "https"],
          },
          host: {
            default: "localhost:3000",
          },
        },
      },
      {
        url: "https://back.matc84.tauane.artadevs.tech",
        description: "Servidor Vercel (Produção)",
      },
    ],
    paths: {
      "/auth/register": {
        post: {
          summary: "Cria um novo usuário",
          description: "Cria um novo usuário",
          operationId: "createUser",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
                examples: {
                  user: {
                    summary: "Exemplo de usuário",
                    value: {
                      name: "usuario",
                      email: "email@example.com",
                      password: "exemplo123",
                      city: "Salvador",
                      state: "Bahia",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Usuário criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
      "/auth/check-mail": {
        post: {
          summary: "Verifica email",
          description:
            "Verifica se o email digitado existe no banco de dados, se sim, envia um token para o email do usuário",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      description: "Email do usuário",
                    },
                  },
                  required: ["email"],
                },
                examples: {
                  user: {
                    summary: "Exemplo de email",
                    value: {
                      email: "email@example.com",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Token enviado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TokenResponse",
                  },
                },
              },
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
      "/auth/verify-token/{token}": {
        get: {
          summary: "Verifica token",
          description: "Verifica se o token digitado é válido",
          parameters: [
            {
              name: "token",
              in: "path",
              description: "Token do usuário",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Token válido!",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TokenResponse",
                  },
                },
              },
            },
            404: {
              description: "Token expirado ou inválido!",
            },
          },
        },
      },
      "/auth/modify-password": {
        post: {
          summary: "Alteração de senha do usuário",
          description: "Altera a senha do usuário",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      description: "Email do usuário",
                    },
                    password: {
                      type: "string",
                      description: "Nova senha do usuário",
                    },
                  },
                  required: ["email", "password", "token"],
                },
                examples: {
                  user: {
                    summary: "Exemplo de modificação de senha",
                    value: {
                      email: "email@example.com",
                      password: "Password1*",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Senha alterada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PasswordChangeResponse",
                  },
                },
              },
            },
            400: {
              description: "Dados inválidos",
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
      "/user/{id}": {
        get: {
          summary: "Busca um usuário pelo ID",
          description: "Busca um usuário pelo ID",
          operationId: "getUserById",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID do usuário",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Usuário encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
      "/user/": {
        delete: {
          summary: "Deleta um usuário pelo token",
          description: "Deleta um usuário pelo token",
          operationId: "deleteUserByToken",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Usuário deletado com sucesso",
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
        patch: {
          summary: "Atualiza um usuário pelo token",
          description:
            "Atualiza os dados de um usuário pelo token, exceto o email",
          operationId: "updateLoggedUser",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Nome do usuário",
                    },
                    password: {
                      type: "string",
                      description: "Senha do usuário",
                    },
                    city: {
                      type: "string",
                      description: "Cidade",
                    },
                    state: {
                      type: "string",
                      description: "Estado",
                    },
                  },
                  required: ["name", "password", "city", "state"],
                },
                examples: {
                  user: {
                    summary: "Exemplo de atualização de usuário",
                    value: {
                      name: "novoNome",
                      password: "novaSenha123",
                      city: "Aracaju",
                      state: "Sergipe",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Usuário atualizado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
      "/user/me": {
        get: {
          summary: "Busca dados do usuário autenticado",
          description:
            "Retorna os dados do usuário autenticado usando Bearer Token",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Dados do usuário",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            401: {
              description: "Token não fornecido ou inválido",
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
      "/admin/users/": {
        get: {
          summary: "Busca todos os usuários (admin)",
          description:
            "Retorna uma lista de todos os usuários para administração",
          operationId: "findAllUsers",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Lista de usuários",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/admin/user/{id}": {
        delete: {
          summary: "Deleta um usuário pelo ID (admin)",
          description: "O administrador deleta qualquer usuário passando o ID",
          operationId: "deleteUserByIdAdmin",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID do usuário a ser deletado",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Usuário deletado com sucesso",
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
      "/auth/login": {
        post: {
          summary: "Login de usuário",
          description: "Autentica um usuário com email e senha",
          operationId: "loginUser",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      description: "Email do usuário",
                    },
                    password: {
                      type: "string",
                      description: "Senha do usuário",
                    },
                  },
                  required: ["email", "password"],
                },
                examples: {
                  credentials: {
                    summary: "Exemplo de credenciais",
                    value: {
                      email: "email@example.com",
                      password: "senha123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login bem-sucedido",
              headers: {
                Authorization: {
                  description: "Token de autenticação JWT",
                  schema: {
                    type: "string",
                  },
                },
              },
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TokenResponse",
                  },
                },
              },
            },
            401: {
              description: "Credenciais inválidas",
            },
          },
        },
      },
      "/testimonials/all": {
        get: {
          summary: "Busca todos os depoimentos (admin)",
          description:
            "Retorna uma lista de todos os depoimentos cadastrados no sistema, incluindo informações sobre a imagem de cada depoimento, se disponível.",
          operationId: "getTestimonials",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description:
                "Lista de depoimentos retornada com sucesso.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/testimonials",
                    },
                  },
                  example: [
                    {
                      title : "Depoimento 1",
                      nameInterviewed: "Entrevistado 1",
                      interviewerName: "Entrevistador 1",
                      description: "Descrição do depoimento 1",
                      date : "2021-10-10",
                      image: "/image/depoimento_a.jpg",
                    },
                    {
                      title : "Depoimento 2",
                      nameInterviewed: "Entrevistado 2",
                      interviewerName: "Entrevistador 2",
                      description: "Descrição do depoimento 2",
                      date : "2025-10-10",
                      image: "/image/depoimento_b.jpg",
                    },
                  ],
                },
              },
            },
            401: {
              description:
                "Não autorizado. Token de autenticação inválido ou ausente.",
            },
            500: {
              description: "Erro interno do servidor. Contate o administrador.",
            },
          },
        },
      },
      "/testimonials/image/{id}": {
        get: {
          summary: "Obtém a imagem de um depoimento",
          description:
            "Retorna a imagem correspondente ao ID do depoimento",
          operationId: "getImage",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID do depoimento",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Imagem encontrada e retornada com sucesso",
              content: {
                "image/jpeg": {
                  schema: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
            401: {
              description: "Imagem não encontrada",
            },
            500: {
              description: "Erro interno do servidor. Contate o administrador.",
            },
          },
        },
      },
      "/testimonials/{id}": {
        delete: {
          summary: "Deleta um depoimento",
          description:
            "Remove o depoimento correspondente ao ID fornecido",
          operationId: "deleteTestimonial",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID do depoimento",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            204: {
              description: "Depoimento deletado com sucesso",
            },
            404: {
              description: "Depoimento não encontrado",
            },
            500: {
              description: "Erro interno do servidor. Contate o administrador.",
            },
          },
        },
      },
      "/testimonial/create": {
        post: {
          summary: "Cria um depoimento (admin)",
          description: "Realiza a criação de um depoimento",
          operationId: "addTestimonial",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "Depoimento X",
                    },
                    nameInterviewed: {
                      type: "string",
                      example: "Entrevistado X",
                    },
                    interviewerName: {
                      type: "string",
                      example: "Entrevistador X",
                    },
                    description: {
                      type: "string",
                      example:
                        "Esta é uma longa descrição exemplo de um depoimento",
                    },
                    date : {
                      type: "string",
                      example: "2021-10-10",
                    },
                    image: {
                      type: "string",
                      format: "binary",
                      description: "Arquivo de imagem (JPEG, PNG, etc.)",
                    },
                  },
                  required: [
                    "title",
                    "name",
                    "nameInterviewed",
                    "interviewerName",
                    "description",
                    "date",
                    "image",
                  ],
                },
              },
            },
          },
          responses: {
            201: {
              description: "Depoimento registrado com sucesso",
            },
            400: {
              description: "Campos obrigatórios em falta",
            },
          },
        },
      },
      "/testimonial/{id}/": {
        patch: {
          summary: "Atualiza um depoimento (admin)",
          description:
            "Realiza uma atualização em um depoimento definido por ID",
          operationId: "updateTestimonial",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID do depoimento a ser alterado",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "Depoimento X",
                    },
                    nameInterviewed: {
                      type: "string",
                      example: "Entrevistado X",
                    },
                    interviewerName: {
                      type: "string",
                      example: "Entrevistador X",
                    },
                    description: {
                      type: "string",
                      example:
                        "Esta é uma longa descrição exemplo de um depoimento",
                    },
                    date : {
                      type: "string",
                      example: "2021-10-10",
                    },
                    image: {
                      type: "string",
                      format: "binary",
                    },
                  },
                  required: [],
                },
                encoding: {
                  image: {
                    contentType: "image/png, image/jpeg",
                  },
                },
              },
            },
          },
          responses: {
            204: {
              description: "Depoimento atualizado com sucesso",
            },
            404: {
              description: "Depoimento não encontrado",
            },
            400: {
              description: "Campos obrigatórios em falta",
            },
          },
        },
      },
      delete: {
        summary: "remove um depoimento (admin)",
        description: "Realiza a remoção de um depoimento definido por ID",
        operationId: "deleteTestimonial",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID do depoimento a ser removido",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          204: {
            description: "Depoimento removido com sucesso",
          },
          404: {
            description: "Depoimento não encontrado",
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.route.js"],
};
