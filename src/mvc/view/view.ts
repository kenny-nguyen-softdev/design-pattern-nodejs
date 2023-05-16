export class View{
    //Rendering the raw data returned by controller
    public renderResult(message: string): boolean {
        console.log(`View: (RENDERED) ${message}`);
        return true;
    }
}

export { View as viewModule };