import cluster from 'node:cluster';
import os from 'node:os';
import { Injectable, Logger } from '@nestjs/common';

const numCPUs = os.cpus().length;

console.log('number of cpu' , numCPUs)

@Injectable()
export class AppClusterService {

    private static logger =  new Logger(AppClusterService.name)
    static clusterize(callback: Function): void {
        if(cluster.isMaster){
            this.logger.log(`Master server started on ${process.pid}`);
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker, code, signal) => {
                this.logger.log(`Worker ${worker.process.pid} died. Restarting`);
                cluster.fork();
            })
        } else {
            this.logger.log(`Cluster server started on ${process.pid}`)
            callback();
        }
    }
}
