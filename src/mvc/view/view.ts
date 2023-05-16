export class View{
    public renderResult(message: string): boolean {
        console.log(`View: (RENDERED) ${message}`);
        return true;
    }
}

export { View as viewModule };