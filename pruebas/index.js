// const generateRandom = () => {

//     const numbers = {}; 

//     for ( let index = 0; index < 2; index++ ){
//         const randomNumber = Math.ceil( Math.random() * 20 );
//         const numberFind = Object.keys(numbers).find( (number) => number == randomNumber )

//         if(numberFind){
//             numbers[randomNumber] += 1;
//         }else {
//             numbers[randomNumber] + 1;
//         }

//     }

//     return numbers;
// }

// console.log( generateRandom() );
//***********************************************Generate random************************************************************* */
//*******************************************User Manager********************************************************************* */

// import crypto from "crypto";

// const secretKey = "micuenta"

// class UsersManager{
//     static users = [];

//     static hashPassword = (password) => {
//         const hashedPassword = crypto.createHmac("sha256", secretKey).update(password).digest("hex")
//         return hashedPassword;
//     }

//     static createUser = (user) => {
//         const hashedPassword = this.hashPassword(user.password);
//         const newUser = { ...user, password: hashedPassword};
//         this.users.push (newUser);

//         console.log("Usuario creado correctamente!")
//     }

//     static showUsers = () => {
//         console.log(this.users);
//     }

//     static validateUser = (username, password) => {
//         const userFind = this.users.find( (user) => user.userName === username)
//         if (!userFind) return "usuario no encontrado";

//         const hashedPassword = this.hashPassword(password);
//         if(userFind.password !== hashedPassword) return "Error, Constraseña incorrecta";

//         return "Logueado correctamente";
//     }
// }

// UsersManager.createUser( {
//     firstName: "Franco",
//     lastName: "Garcia",
//     userName: "franQ",
//     password: "franco123"
// } )

// UsersManager.showUsers()

// console.log(UsersManager.validateUser("franQ", "franco123"))
// console.log(UsersManager.validateUser("franQ", "franco123"))

//******************************************************************************************************************** */

