import { Injectable } from "@angular/core";

interface ILog {
  date: Date;
  message: string;
}
@Injectable({
  providedIn: "root"
})
export class MessageService {
  private _messages: ILog[] = [];
  get messages(): ILog[] {
    return this._messages.slice(0, this._messages.length);
  }

  constructor() { }

  public add(message: string): void {
    this._messages.push({ date: new Date(), message: message });
  }

  public clear(): void {
    this._messages = [];
  }

  public get hasMessages(): boolean {
    return !!this._messages.length;
  }
}
