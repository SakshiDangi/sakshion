import { transaction } from "../transactions";

async function main() {

  await transaction(async (tx) => {

    console.log("Transaction started");

    // Later:
    //
    // await tx.insert(...)
    // await tx.update(...)
    // await tx.delete(...)

    console.log("Transaction committed");

  });

}

main().catch(console.error);