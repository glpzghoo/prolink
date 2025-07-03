import { featuredSkills, review, skill, user } from '@prisma/client';

export type CustomUser = user & {
  skill: CustomSkill[];
  reviewee: CustomReviewee[];
  reviewer: review[];
  featuredSkills: CustomFeaturedSkill[];
  birthday: string;
};

export type CustomReviewee = review & {
  reviewee: CustomUser;
  reviewer: CustomUser;
  createdAt: string;
};

export type CustomSkill = skill & {
  user: CustomUser[];
};

export type CustomFeaturedSkill = featuredSkills & {
  skill: skill;
  startedAt: string;
  endedAt: string;
  user: CustomUser;
};

export type Favorite = { id: string; role: string };
