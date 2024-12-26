import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const FETCH_DATA_URL = 'https://data-collection-fbn6t4.5sc6y6-1.usa-e2.cloudhub.io/api/fetchData';
const CREATE_ALERT_URL = 'https://data-collection-fbn6t4.5sc6y6-1.usa-e2.cloudhub.io/api/createAlert';

app.get('/process-lift-data', async (req: Request, res: Response) => {
    try {
        
        const fetchResponse = await axios.get(FETCH_DATA_URL, {
            params: {
                operationalStatus: 'Operational',
                customerFacingFlag: true,
                inCommissionFlag: true,
            },
        });
        // console.log(fetchResponse,'fetchResponsefetchResponse')

        const resultSet = fetchResponse.data.data.resultSet;
        // console.log(resultSet,'resultSet')
        
        const availableData = resultSet.filter((item: any) => item.status === 'Available');
        
        
        const LiftData = availableData.map((item: any) => ({
            StationName: item.station.name,
            CRSCode: item.station.crsCode,
            SensorId: item.sensorId,
        }));

        const requestData = { LiftData };
        // console.log(requestData)
        
        const postResponse = await axios.post(CREATE_ALERT_URL, requestData);

        res.json({
            success:true,
            message: 'Lift data processed and alert created successfully.',
            data: postResponse.data,
        });
    } catch (error:any) {
        console.error('Error processing lift data:', error);
        res.status(500).json({
            data:[],
            success:false,
            message: error.response?.data || error.message,
        });
    }
});
import  { performance, PerformanceObserver }  from 'perf_hooks'

const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration} milliseconds`);
  });
});
obs.observe({ entryTypes: ['measure'] });

// Task 1
performance.mark('startTask1');
for (let i = 0; i < 1000000000; i++) {
  // Perform some computational task for Task 1
}
performance.mark('endTask1');
performance.measure('Task 1 Execution Time', 'startTask1', 'endTask1');

// Task 2
performance.mark('Task2');
for (let i = 0; i < 500000000; i++) {
  // Perform some computational task for Task 2
}
performance.mark('endTask2');
performance.measure('Task 2 Execution Time', 'Task2', 'endTask2');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
