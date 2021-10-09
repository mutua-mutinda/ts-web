import { Views } from "./Views";
import { User, UserProps } from "../models/User";

export class UserForm extends Views<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.setAge,
      "click:.set-name": this.setNameClick,
      "click:.save-user": this.saveUser,
    };
  }

  saveUser = (): void => {
    this.model.save();
  };

  setNameClick = (): void => {
    const input = this.parent.querySelector("input");

    if (input) {
      const name = input.value;

      this.model.set({ name });
    }
  };

  setAge = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
        <div>
        <input placeholder="${this.model.get("name")}"/> &nbsp; &nbsp;
        <button class="set-name">Update Name</button> <br> <br>
        <button class="save-user">Save User</button> &nbsp; &nbsp;
        <button class="set-age">Set Random Age</button>
        </div>
        `;
  }
}
