import fs from 'fs';

export async function main() {
    const fsAsync = fs.promises;
    const json = JSON.parse(await fsAsync.readFile('lv_mpy_example.json', 'utf8'));
    const objects = json.objects
    for (const [groupName, funcs] of Object.entries(objects)) {
        parseFuncGroups(groupName, (funcs as any).members);
    }
}

export function parseFuncGroups(groupName: string, funcs: any) {
    console.log(`Group name: ${groupName}`);

    for (const [funcName, func] of Object.entries(funcs)) {
        parseFunctions(groupName, funcName, (func as any).args, (func as any).return_type);
    }
}

export function parseFunctions(groupName: string, funcName: string, args: any, returnType: string) {
    let argList = '(';
    if (args && args.length && args.length > 0) {
        for(const arg of args) {
            argList += `${arg.type} ${arg.name}, `
        }
    }

    argList = argList.replace(/,\s*$/, ""); // Remove last comma 
    argList += ');'

    console.log(`${returnType} lv_${groupName}_${funcName}${argList}`);
}

main();