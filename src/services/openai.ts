import OpenAI from "openai";

export class OpenAIHelper {
  constructor(
    private readonly client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 1000 * 60 * 5,
    }) //
  ) {}

  public async ask(prompt: string) {
    const result = await this.client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.9,
      max_tokens: 1500,
      top_p: 1,

      frequency_penalty: 0.0,
      presence_penalty: 0.6,
    });

    const choice = result.choices[0].message.content;

    if (!choice) throw new Error("Reposta não encontrada");

    return choice;
  }

  public async imagine(input: string) {
    const result = await this.client.embeddings.create({
      input,
      dimensions: 512,
      model: "text-embedding-ada-002",
    });

    if (!result) throw new Error("Imagem não encontrada");

    return result.data;
  }
}
