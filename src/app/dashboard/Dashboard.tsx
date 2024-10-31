'use client';

import { useEffect, useState } from "react";
import { getStepsData } from "src/lib/google-api";
import { databases } from "src/lib/appwrite";
import ProgressChart from "src/components/ProgressChart";

const Dashboard = () => {
    const [chartData, setChartData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [manualData, setaManualData] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch manual data from Appwrite
                const response = await databases.listDocuments('[DATABASE_ID]', '[COLLECTION_ID]')
                const manualWorkouts = response.documents.map(doc => doc.steps || 0);

                // Fetch data from Google fit
                const googleData = await getStepsData();
                const googleSteps = googleData.bucket.map(bucket => {
                    return bucket.dataset[0].point.reduce((total, point) => total + point.value[0].intVal, 0)
                });

                // Combine the data
                const allStepsData = [...manualWorkouts, ...googleSteps];
                const uniqueLabels = Array.from(new Set([
                    ...manualWorkouts.map((_, index) => `Manual Day ${index + 1}`),
                    ...googleSteps.map((_, index) => `Google Fit Day ${index + 1}`)
                ])) 

                setChartData(allStepsData);
                setLabels(uniqueLabels);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData()
    }, [])

    return (
        <div>
            <h2>Your Progress</h2>
            <ProgressChart data={chartData} labels={labels} />
        </div>
    );
};

export default Dashboard;