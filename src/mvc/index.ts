import { controllerModule } from "./controller/controller"

const controller = new controllerModule()
console.log('Client: searching for manager information')
controller.clientInput('manager')

console.log('Client: searching for employee information')
controller.clientInput('employee')