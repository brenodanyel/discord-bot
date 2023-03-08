import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAI {
  constructor(private client = new OpenAIApi(configuration)) {}

  public async ask(prompt: string) {
    const { data } = await this.client.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.9,
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });

    const choice = data.choices[0].text;

    if (!choice) throw new Error("Reposta não encontrada");

    return choice;
  }

  public async imagine(prompt: string) {
    const { data } = await this.client.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const result = data.data.at(0)?.url;

    if (!result) throw new Error("Imagem não encontrada");

    return result;
  }
}
