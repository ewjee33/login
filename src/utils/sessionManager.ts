import { Injectable, Scope } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable({ scope: Scope.REQUEST })
export class SessionManager {
  session: mongoose.ClientSession;

  async startSession(): Promise<mongoose.ClientSession>{
    this.session = await mongoose.startSession();
    this.session.startTransaction();
    console.log(this.session)
    return this.session;
  }

  async commitTransaction() {
    await this.session.commitTransaction();
    this.session.endSession();
  }

  async abortTransaction() {
    await this.session.abortTransaction();
    this.session.endSession();
  }
}