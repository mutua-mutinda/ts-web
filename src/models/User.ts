import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { ApiSync } from "./ApiSync";
import { Eventing } from "./Eventing";
import { Collection } from "./Collection";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  //   constructor(attrs: UserProps) {
  //     super(
  //       new Attributes(attrs),
  //       new ApiSync<UserProps>(rootUrl),
  //       new Eventing()
  //     );
  //   }
  static buildUser(attr: UserProps): User {
    return new User(
      new Attributes(attr),
      new ApiSync<UserProps>(rootUrl),
      new Eventing()
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, User.buildUser);
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);

    this.set({ age });
  }
}
