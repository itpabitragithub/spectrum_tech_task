"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const FETCH_DATA_URL = 'https://data-collection-fbn6t4.5sc6y6-1.usa-e2.cloudhub.io/api/fetchData';
const CREATE_ALERT_URL = 'https://data-collection-fbn6t4.5sc6y6-1.usa-e2.cloudhub.io/api/createAlert';
app.get('/process-lift-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Fetch data
        const fetchResponse = yield axios_1.default.get(FETCH_DATA_URL, {
            params: {
                operationalStatus: 'Operational',
                customerFacingFlag: true,
                inCommissionFlag: true,
            },
        });
        const resultSet = fetchResponse.data.resultSet;
        // Filter results
        const availableData = resultSet.filter((item) => item.status === 'Available');
        // Map to desired structure
        const LiftData = availableData.map((item) => ({
            StationName: item.station.name,
            CRSCode: item.station.crsCode,
            SensorId: item.SensorId,
        }));
        const requestData = { LiftData };
        console.log(requestData);
        // Send POST request
        const postResponse = yield axios_1.default.post(CREATE_ALERT_URL, requestData);
        // Respond with POST API response
        res.json({
            message: 'Lift data processed and alert created successfully.',
            data: postResponse.data,
        });
    }
    catch (error) {
        console.error('Error processing lift data:', error);
        res.status(500).json({
            message: 'An error occurred while processing lift data.',
            error: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message,
        });
    }
}));
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
