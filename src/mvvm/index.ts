// Model
class User {
  private _name: string;
  private _age: number;
  private _onChange: (() => void) | null = null;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
    this._onChange?.();
  }

  get age(): number {
    return this._age;
  }

  set age(age: number) {
    this._age = age;
    this._onChange?.();
  }

  setOnChange(callback: () => void): void {
    this._onChange = callback;
  }
}

// ViewModel
class UserViewModel {
  private _user: User;

  constructor(user: User) {
    this._user = user;
  }

  get name(): string {
    return this._user.name;
  }

  set name(name: string) {
    this._user.name = name;
  }

  get age(): number {
    return this._user.age;
  }

  set age(age: number) {
    this._user.age = age;
  }
}

// View
class UserView {
  private _viewModel: UserViewModel;

  constructor(viewModel: UserViewModel) {
    this._viewModel = viewModel;
    this._viewModel.name = "Initial Name"; // Initial name set in ViewModel
    this._viewModel.age = 18; // Initial age set in ViewModel
  }

  render(): void {
    console.log(`Name: ${this._viewModel.name}`);
    console.log(`Age: ${this._viewModel.age}`);
  }

  updateName(name: string): void {
    this._viewModel.name = name;
  }

  updateAge(age: number): void {
    this._viewModel.age = age;
  }
}

// Usage
const user = new User("John Doe", 25);
const viewModel = new UserViewModel(user);
const view = new UserView(viewModel);

viewModel.setOnChange(() => {
  view.render(); // Automatically update the view when ViewModel changes
});

view.render(); // Initial rendering

view.updateName("Jane Smith"); // Updating name
view.updateAge(30); // Updating age
