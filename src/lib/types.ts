export type responseData = {
  success: boolean;
  userExist?: boolean;
  message?: string;
  code?: string;
  data?: {
    name?: string;
    informations?: {
      birthday: Date;
      companyName: string;
      email: string;
      firstName: string;
      id: string;
      lastName: string;
      pfp: string;
      phoneNumber: string;
      role: string;
    };
  };
};
