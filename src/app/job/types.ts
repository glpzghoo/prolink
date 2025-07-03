import { job, jobApplication, review, skill, user } from '@prisma/client';

export type CustomJob = job & {
  poster: CustomUser;
  postedAt: string;
  updatedAt: string;
  skill: CustomSkill[];
  jobApplication: jobApplication[];
};

export type CustomUser = user & {
  reviewee: CustomReviewee[];
  reviewer: review[];
};

export type CustomSkill = skill & {
  job: job[];
};

export type CustomReviewee = review & {
  reviewee: CustomUser;
  reviewer: CustomUser;
};
