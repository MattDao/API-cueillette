import User from "../models/User";
import AppDataSource from "../Data-source";


class UserService {
  async getAllUsers(): Promise<User[]> {
    console.log("UserService");

    return AppDataSource.query("SELECT * FROM listusers;");
  }
  getOneUserById(id: number): Promise<User> {
    return AppDataSource.query(`SELECT name FROM User where id =${id}`);
  }

  createNewUser(NewUser: User): Promise<any> {
    console.log(NewUser.email);
    return AppDataSource.query(
      `INSERT INTO user (email, password) VALUES ('${NewUser.email}', ${NewUser.password}})`
    );
  }

  updateOneUser(id: number, changes: User): Promise<any> {
    console.log(changes);
    console.log(id);

    return AppDataSource.query(
      `UPDATE user SET email ='${changes.email}',password = ${changes.password} WHERE id= ${id}`
    );
  }

  deleteOneUser(id: number): Promise<any> {
    console.log(id);
    return AppDataSource.query(`DELETE FROM user WHERE id = ${id}`);
  }
}

export default UserService;
