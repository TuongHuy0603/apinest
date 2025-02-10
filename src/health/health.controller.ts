import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, MongooseHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { Public } from 'src/decorator/customize';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: MongooseHealthIndicator,
    ) { }

    @Get()
    @Public()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
        ]);
    }
}

