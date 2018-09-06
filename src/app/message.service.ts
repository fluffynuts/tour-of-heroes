import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  private _messages: string[] = [];
  get messages(): string[] {
    return this._messages.slice(0, this._messages.length);
  }

  constructor() { }

  public add(message: string): void {
    this._messages.push(message);
  }

  public clear(): void {
    this._messages = [];
  }

  public get hasMessages(): boolean {
    return !!this._messages.length;
  }
}
