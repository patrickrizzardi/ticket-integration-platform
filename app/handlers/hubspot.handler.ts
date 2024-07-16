import type { THttpResponse } from 'root/typeDefs/ElysiaGroup.ts';

export default async (): Promise<THttpResponse<undefined>> => {
  try {
    // Get the hubspot data
    // Trigger add it to the database
    // Trigger a worker to format the data and send it to the integration of choice (those choices can be saved in a relationship table that is related to the user)
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};
