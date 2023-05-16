import { viewModule } from "../view/view"
import { modelModule } from "../model/model"

export class Controller{
    /**
     * Initialize model and view modules    
     */
    private model = new modelModule()
    private view = new viewModule()

    /**
     * This is where the controller get the model data from user input and send it to the view module to render
     * @param param 
     */
    public clientInput(param: string): void{
        this.view.renderResult(this.model.getInfo(param))
    }
}

export { Controller as controllerModule };