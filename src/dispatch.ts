import execa from "execa"
import * as core from '@actions/core'

export const dispatch = (cmd: string, args?: any[], cwd?: string) => {
    return new Promise((resolve, reject) => {
        core.info(`Starting child "${cmd} ${args?.join(" ")}".`)

        const proc = execa(cmd, args, { cwd: cwd ? cwd : process.cwd() });

        (proc.stdout as any).on('data', (data: any) => {
            const d = data.toString();

            d.split("\n").forEach((line: any) => {
                if(line.length !== 0) core.info(line)
            });
        });

        (proc.stdout as any).on('error', (data: any) => {
            const d = data.toString();

            d.split("\n").forEach((line: any) => {
                if(line.length !== 0) core.info(line)
            });
        });

        proc.on('exit', () => {
            core.info(`Done with "${cmd} ${args?.join(" ")}".`)
            resolve(true);
        })
    })
}