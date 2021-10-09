import { Eventing } from "./Eventing";
import axios, { AxiosResponse } from "axios";

export class Collection<T, K> {
  models: T[] = [];
  events = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });
      this.trigger("change");
    });
  }
}

/**
   fetch(): void {
     axios.get(this.rootUrl).then((response: AxiosResponse) => {
        const fetchedModels = response.data.map((value: K) => {
        return this.deserialize(value);
        });
    
        this.set(fetchedModels);
    
        this.trigger('change');
    });
    }
    
    set(fetchedModels: T[]): void {
    fetchedModels.forEach((fetchedModel) => {
        const existing = this.models.find(m => m.id === fetchedModel.id);
        if (existing) {
        existing.setAll(fetchedModel.getAll());
        } else {
        this.models.push(fetchedModel);
        }
    });
    }
 */
