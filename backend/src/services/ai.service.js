import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY } from '#config/variables.js';
import { z } from 'zod';

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  title: z
    .string()
    .describe(
      'The title of the job for which the interview report is generated.',
    ),
  matchScore: z
    .number()
    .describe(
      `A score between 0 and 100 that describes how well the candidate's profile matches the job described.`,
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            `The technical question that can be asked in an interview for the job described.`,
          ),
        intention: z
          .string()
          .describe(`The intention of interviewer behind asking the question.`),
        answer: z
          .string()
          .describe(
            `How to frame and answer the question. Define the approach and points to cover while answering the question.`,
          ),
      }),
    )
    .describe(
      `Technical questions along with their intention of asking and how to frame the answer, that can be asked in an interview on the basis of provided resume and job described.`,
    ),
  behaviouralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            `The behavioural question that can be asked in an interview for the job described.`,
          ),
        intention: z
          .string()
          .describe(`The intention of interviewer behind asking the question.`),
        answer: z
          .string()
          .describe(
            `How to frame and answer the question. Define the approach and points to cover while answering the question.`,
          ),
      }),
    )
    .describe(
      `Behavioural questions along with their intention of asking and how to frame the answer, that can be asked in an interview on the basis of provided resume and job described.`,
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe(`The skill which the candidate is lacking.`),
        severity: z
          .enum(['low', 'medium', 'high'])
          .describe(
            `The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances.`,
          ),
      }),
    )
    .describe(
      `List of skill gaps in the candidate's profile along with their severity.`,
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe(`The day number in the preparation plan, starting from 1.`),
        focus: z
          .string()
          .describe(
            `The skill on which the candidate have to focus on the given day, e.g. data structures, system design, mock interviews etc.`,
          ),
        tasks: z
          .array(z.string())
          .describe(
            `List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.`,
          ),
      }),
    )
    .describe(
      `A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively.`,
    ),
});

export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
  Generate an interview report for a candidate with the following details:
  Resume: ${resume}
  Self Description: ${selfDescription}
  Job Description: ${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseJsonSchema: z.toJSONSchema(interviewReportSchema),
    },
  });

  return interviewReportSchema.parse(JSON.parse(response.text));
}
