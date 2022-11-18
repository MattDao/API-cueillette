import User from "../models/User";
import AppDataSource from "../Data-source";

class UserService {
  async getAllUsers(): Promise<User[]> {
    console.log("UserService");

    return AppDataSource.query("SELECT * FROM listusers;");
  }
  async getOneUserById(id: number): Promise<User> {
    return AppDataSource.query(`SELECT email FROM listusers where id =${id}`);
  }

  async signInNewUser(NewUser: User): Promise<User> {
    console.log(NewUser.email);
    return AppDataSource.query(
      `INSERT INTO listusers (email, password) VALUES ('${NewUser.email}', '${NewUser.password}')`
    );
  }

  async updateOneUser(id: number, changes: User): Promise<User> {
    console.log(changes);
    console.log(id);

    return AppDataSource.query(
      `UPDATE listusers SET email ='${changes.email}',password = ${changes.password} WHERE id= ${id}`
    );
  }

  async deleteOneUser(id: number): Promise<User> {
    console.log(id);
    return AppDataSource.query(`DELETE FROM listusers WHERE id = ${id}`);
  }

  async loginOneUser(user: User): Promise<User[]> {
    return AppDataSource.query(
      `SELECT password from listusers WHERE email = '${user.email}';`
    );
  }
}

export default UserService;
