import User from "../models/User";
import AppDataSource from "../Data-source";

class UserService {
  async getAllUsers(): Promise<User[]> {
    console.log("UserService");

    return AppDataSource.query("SELECT * FROM listusers;");
  }
  getOneUserById(id: number): Promise<User> {
    return AppDataSource.query(`SELECT email FROM listusers where id =${id}`);
  }

  createNewUser(NewUser: User): Promise<User> {
    console.log(NewUser.email);
    return AppDataSource.query(
      `INSERT INTO listusers (email, password) VALUES ('${NewUser.email}', '${NewUser.password}')`
    );
  }

  updateOneUser(id: number, changes: User): Promise<User> {
    console.log(changes);
    console.log(id);

    return AppDataSource.query(
      `UPDATE listusers SET email ='${changes.email}',password = ${changes.password} WHERE id= ${id}`
    );
  }

  deleteOneUser(id: number): Promise<User> {
    console.log(id);
    return AppDataSource.query(`DELETE FROM listusers WHERE id = ${id}`);
  }
}

export default UserService;
