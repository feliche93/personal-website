const main = async () => {
    const [deployer] = await ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log(`Deployer contracts with: ${deployer.address}`);    
    console.log(`Deployer account balance: ${accountBalance.toString()}`);

    const AMAPortal = await ethers.getContractFactory("AMAPortal");
    const amaContract = await AMAPortal.deploy();
    await amaContract.deployed();

    console.log(`Deployed AMAPortal contract to: ${amaContract.address}`);
    
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();