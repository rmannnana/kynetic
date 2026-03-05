import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../prisma/generated/prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    user: any;
    onModuleInit(): Promise<void>;
}
