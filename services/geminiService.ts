import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, SOLUTIONS } from '../constants';

// System instruction to give the AI context about the portfolio owner
const SYSTEM_INSTRUCTION = `
Você é o assistente virtual do portfólio de ${PERSONAL_INFO.name}.
Seu objetivo é responder perguntas de recrutadores ou potenciais clientes sobre as habilidades e experiência do ${PERSONAL_INFO.name}.

Informações do perfil:
- Cargo: ${PERSONAL_INFO.role}
- Experiência: Cerca de 1 ano de aprendizado intensivo e prática.
- Comunidade: Membro ativo da "Comunidade Sem Codar".
- Diferencial: Utiliza Inteligência Artificial para acelerar o desenvolvimento e melhorar a qualidade do código/no-code.
- Soluções que entrega: ${SOLUTIONS.map(s => s.title + " (" + s.description + ")").join('; ')}.
- Projetos recentes: ${PROJECTS.map(p => p.title).join(', ')}.

Tom de voz: Profissional, entusiasmado, moderno e direto.
Se perguntarem algo fora do contexto profissional, traga educadamente a conversa de volta para o trabalho e projetos do ${PERSONAL_INFO.name}.
Responda sempre em Português do Brasil. Mantenha as respostas concisas (máximo de 3 parágrafos).
`;

let chatInstance: Chat | null = null;

export const getGeminiChat = (): Chat => {
  if (chatInstance) return chatInstance;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatInstance = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });

  return chatInstance;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<GenerateContentResponse>> => {
  try {
    const chat = getGeminiChat();
    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};