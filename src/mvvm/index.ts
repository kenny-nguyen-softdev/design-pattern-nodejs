export interface ITodoItem {
  id: number;
  title: string;
  complete: boolean;
}
const data = [{}];
let index = data.length + 2;

class TodosAdapter {
  fetchTodos() {
    return new Promise<ITodoItem[]>((resolve) => {
      setTimeout(() => {
        const result = [
          ...data.sort((l, r) => (l.id > r.id ? -1 : l.id < r.id ? 1 : 0)),
        ];
        utils.text(utils.el(".console"), JSON.stringify(result, null, 2));
        resolve(result);
      }, 200);
    });
  }

  createTodo(title) {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        data.push({
          id: index++,
          title: title,
          complete: false,
        });
        resolve(true);
      }, 200);
    });
  }

  updateTodo(id, attrs) {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const item = utils.find(data, (i) => i.id === id);
        if (item) {
          Object.assign(item, attrs);
          resolve(true);
        } else {
          reject(
            new Error(`Can't update. "todo" task with id: ${id} was not found`)
          );
        }
      });
    });
  }

  deleteTodo(id) {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const item = utils.find(data, (i) => i.id === id);
        const index = data.indexOf(item);
        if (item) {
          data.splice(index, 1);
          resolve(true);
        } else {
          reject(
            new Error(`Can't delete. "todo" task with id: ${id} was not found`)
          );
        }
      });
    });
  }
}

function dispatcher() {
  const handlers = [];

  return {
    add(handler) {
      if (!handler) {
        throw new Error("Can't attach to empty handler");
      }
      handlers.push(handler);

      return function () {
        const index = handlers.indexOf(handler);
        if (~index) {
          return handlers.splice(index, 1);
        }
        throw new Error(
          "Ohm! Something went wrong with detaching unexisting event handler"
        );
      };
    },

    notify() {
      const args = [].slice.call(arguments, 0);
      for (const handler of handlers) {
        handler.apply(null, args);
      }
    },
  };
}

function initEvents(...args) {
  const events = {};
  for (const key of args) {
    events[key] = dispatcher();
  }
  return {
    on(eventName, handler) {
      return events[eventName].add(handler);
    },
    trigger(eventName) {
      events[eventName].notify();
    },
  };
}

class Base<S = {}> {
  state: S;

  constructor(...args: string[]) {
    const events = initEvents(...args);

    this.on = events.on;
    this.trigger = events.trigger;
  }

  on(eventName, handler) {
    throw new Error("Not implemented");
  }

  trigger(eventName) {
    throw new Error("Not implemented");
  }

  prop<K extends keyof S>(propName: K, val?: S[K]): S[K] {
    if (arguments.length > 1 && val !== (this.state as any)[propName]) {
      (this.state as any)[propName] = val;
      this.trigger(`change: ${propName}`);
    }

    return this.state[propName];
  }
}

class TodosModel extends Base {
  static inst = null as TodosModel;
  static instance() {
    if (TodosModel.inst === null) {
      TodosModel.inst = new TodosModel();
      TodosModel.inst.fetch();
    }

    return TodosModel.inst;
  }
  adapter = new TodosAdapter();
  items = [] as ITodoItem[];

  constructor() {
    super("change:items");
  }

  getItems() {
    return this.items;
  }

  setItems(val) {
    if (this.items !== val) {
      this.items = val;
      this.trigger("change:items");
    }
  }

  async fetch() {
    const items = await this.adapter.fetchTodos();
    this.setItems(items);
  }

  createTodo(title) {
    return this.adapter.createTodo(title);
  }

  updateTodo(item: ITodoItem) {
    const { id, ...attrs } = item;
    return this.adapter.updateTodo(id, attrs);
  }

  deleteTodo(item: ITodoItem) {
    const { id } = item;
    return this.adapter.deleteTodo(id);
  }
}

const instances = new WeakMap();

export function current<T extends {}, O extends {}>(
  ctor: { new (...args): T },
  options?: O
): T {
  if (instances.has(ctor)) {
    return instances.get(ctor);
  }
  const inst = new ctor(options);
  instances.set(ctor, inst);

  return inst;
}

export function html(el, html?: string) {
  if (arguments.length > 1) {
    el.innerHTML = html;
  }
  return el.innerHTML;
}

export function el(selector, inst?) {
  inst = inst || document;
  if (!selector) {
    return null;
  }
  if ("string" === typeof selector) {
    return inst.querySelector(selector);
  }
  return selector;
}

export function attr(el, name, val?) {
  if (arguments.length > 2) {
    el.setAttribute(name, val);
  }
  return el.getAttribute(name);
}

export function text(el, text?) {
  if (arguments.length > 1) {
    el.innerText = text;
  }
  return el.innerText;
}

export function remove(el) {
  el.parentNode.removeChild(el);
}

export function on(inst, selector, eventName, fn) {
  const handler = function (evnt) {
    if (evnt.target.matches(selector)) {
      fn(evnt);
    }
  };
  inst.addEventListener(eventName, handler);
  return function () {
    inst.removeEventListener(eventName, handler);
  };
}

export function trigger(el, eventName) {
  el.dispatchEvent(new Event(eventName, { bubbles: true }));
}

export function getResult(inst, getFn) {
  const fnOrAny = getFn && getFn();
  if (typeof fnOrAny === "function") {
    return fnOrAny.call(inst);
  }
  return fnOrAny;
}

export function find<T>(items: T[], fn: (item: T) => boolean) {
  for (const item of items) {
    if (fn(item)) {
      return item;
    }
  }
  return null;
}

export function filter<T>(items: T[], fn: (item: T) => boolean): T[] {
  const res = [] as T[];
  for (const item of items) {
    if (fn(item)) {
      res.push(item);
    }
  }
  return res;
}

export function map<T, Y>(items: T[], fn: (item: T) => Y): Y[] {
  const res = [] as Y[];
  for (const item of items) {
    res.push(fn(item));
  }
  return res;
}

export function last<T>(items: T[], from = 1): T[] {
  const length = items.length;
  return [].slice.call(items, from, length);
}

export function first<t>(items: T[], n = 1) {
  return [].slice.call(items, 0, n);
}