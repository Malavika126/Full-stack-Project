export class Employee {
    id: number = 0;
    name: string = '';
    email: string = '';
    birthdate: string = '';
    password: string = '';
    
    constructor(
        id: number,
        name: string,
        email: string,
        birthdate: string,
        password: string
        ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.birthdate = birthdate;
        this.password = password
    }

}
