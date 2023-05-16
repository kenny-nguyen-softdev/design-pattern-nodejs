interface Workers {
    getInfo(): string;
}

class Manager implements Workers{
    //Get raw data
    public getInfo(): string {
        let text = "Manager information: \n Total: 4 people \n Average salary: 15000$ "
        return text;
    }
}

class Employee implements Workers{
    //Get raw data
    public getInfo(): string {
        let text = "Manager information: \n Total: 40 people \n Average salary: 3500$ "
        return text;
    }
}

export class Model{
    public getInfo(params : string): string {
        if(params == "manager"){
            const manager = new Manager();
            return manager.getInfo();
        }
        const employee = new Employee();
        return employee.getInfo()
    }
}

export { Model as modelModule };