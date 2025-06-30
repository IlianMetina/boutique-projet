import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global()
// This makes the DatabaseService available globally, so it can be injected into any module without needing
// to import the DatabaseModule in every module that needs it.
@Module({
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}
