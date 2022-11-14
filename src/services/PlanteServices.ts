import Plante from "../models/Plante";
import AppDataSource from "./Data-source";

class PlanteService {
    async getAllPlantes(): Promise<Plante[]> {
        console.log('PlanteService');

        return AppDataSource.query('SELECT * FROM plante;');
    }
}

export default PlanteService;