import { gapi } from 'gapi-client';

export const getStepsData = async () => {
    try {
        const response = await gapi.client.request({
            path: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
            method: 'POST',
            body: {
                aggregateBy: [
                    {
                        dataTypeName: 'com.google.step_count.delta',
                    },
                ],
                bucketByTime: { durationMillis: 86400000 }, // 1 day
                startTimeMillis: new Date().setHours(0, 0, 0, 0),
                endTimeMillis: new Date().getTime(),
            },
        });
        return response.result;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get steps data');
    }
}    
