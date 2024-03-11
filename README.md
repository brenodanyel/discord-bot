# Bot do Discord com integração da API OpenAI

Este projeto é um bot do Discord que integra a API OpenAI, incluindo o chatbot GPT e a geração de imagens do DALL-E.

## Requisitos

- NodeJS

## Instalação

1. Clone o repositório: `git clone git@github.com:brenodanyel/discord-bot.git`
2. Instale as dependências: `npm install`
3. Renomeie o arquivo `.env.example` para `.env` e preencha os dados necessários.
4. Rode o comando `npm run build` para construir o projeto.

## Configuração

1. Crie um bot no Discord e obtenha um token de bot. Consulte a [documentação do desenvolvedor do Discord](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) para obter instruções.
2. Obtenha uma chave de API para a API OpenAI. Consulte a [página de api na OpenAI](https://platform.openai.com/account/api-keys) para a sua chave.
3. Renomeie o arquivo `.env.example` para `.env`.
4. Abra o arquivo `.env` e preencha os dados necessários:
   - `DISCORD_TOKEN`: o token do seu bot do Discord
   - `DISCORD_CLIENT_ID`: o ID do cliente do seu bot do Discord.
   - `OPENAI_API_KEY`: a sua chave de API do OpenAI
 
## Utilização

1. Faça build do projeto com o comando `npm run build`.
2. Rode o comando `npm start` para iniciar o bot.
3. Convide o bot para o seu servidor do Discord seguindo as instruções na [documentação do desenvolvedor do Discord](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links).
4. Utilize os comandos listados no menu de ajuda do bot para interagir com a API OpenAI, incluindo o chatbot GPT e a geração de imagens do DALL-E. Para acessar o menu de ajuda, digite `/ajuda` em um canal de texto onde o bot está presente.


