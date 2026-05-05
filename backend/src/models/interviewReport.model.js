import { Schema, model } from 'mongoose';

const technicalQuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: 'Technical question is required',
    },
    intention: {
      type: String,
      required: 'Intention is required',
    },
    answer: {
      type: String,
      required: 'Answer is required',
    },
  },
  {
    _id: false,
  },
);

const behaviouralQuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: 'Behavioural question is required',
    },
    intention: {
      type: String,
      required: 'Intention is required',
    },
    answer: {
      type: String,
      required: 'Answer is required',
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new Schema(
  {
    skill: {
      type: String,
      required: [true, 'Skill is required'],
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: [true, 'Severity is required'],
    },
  },
  { _id: false },
);

const preparationPlanSchema = new Schema(
  {
    day: {
      type: Number,
      required: [true, 'Day is required'],
    },
    focus: {
      type: String,
      required: [true, 'Focus is required'],
    },
    tasks: [
      {
        type: String,
        required: [true, 'Task is required'],
      },
    ],
  },
  { _id: false },
);

const interviewReportSchema = new Schema({
  jobDescription: {
    type: String,
    required: [true, 'Job Description is required'],
  },
  resume: {
    type: String,
  },
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  technicalQuestions: [technicalQuestionSchema],
  behaviouralQuestions: [behaviouralQuestionSchema],
  skillGaps: [skillGapSchema],
  preparationPlan: [preparationPlanSchema],
});

export const interviewReportModel = model(
  'interviewReport',
  interviewReportSchema,
);
