import Plante from "../models/Plante";
import AppDataSource from "../Data-source";

class PlanteService {
  async getAllPlantes(): Promise<Plante[]> {
    console.log("PlanteService");

    return AppDataSource.query("SELECT * FROM listplants;");
  }
  getOnePlantById(id: number): Promise<Plante> {
    return AppDataSource.query(`SELECT name FROM listplants where id =${id}`);
  }

  createNewPlant(NewPlant: Plante): Promise<any> {
    console.log(NewPlant.name);
    return AppDataSource.query(
      `INSERT INTO listplants (name, category, quantity, rating, unitprice, url_pic) VALUES ('${NewPlant.name}', ${NewPlant.category}, ${NewPlant.quantity}, ${NewPlant.rating}, ${NewPlant.unitprice}, ${NewPlant.url_pic})`
    );
  }

  updateOnePlant(id: number, changes: Plante): Promise<any> {
    console.log(changes);
    console.log(id);

    return AppDataSource.query(
      `UPDATE listplants SET name ='${changes.name}',category = ${changes.category}, quantity =${changes.quantity}, rating =${changes.rating}, url_pic =${changes.url_pic} WHERE id= ${id}`
    );
  }

  deleteOnePlant(id: number): Promise<any> {
    console.log(id);
    return AppDataSource.query(`DELETE FROM listplants WHERE id = ${id}`);
  }
}

export default PlanteService;
