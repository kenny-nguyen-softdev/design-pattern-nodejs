import { viewModule } from "../view/view"
import { modelModule } from "../model/model"

export class Controller{
    private model = new modelModule()
    private view = new viewModule()

    public clientInput(param: string): void{
        this.view.renderResult(this.model.getInfo(param))
    }
}

export { Controller as controllerModule };