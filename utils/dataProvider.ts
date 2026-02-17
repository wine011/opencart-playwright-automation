import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider {
    static getJsonData(filePath: string) {
        let data: string = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return data;
    }

    static getCsvData(filePath: string) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        let data = parse(raw, { columns: true, skip_empty_lines: true });
        return data;
    }
}