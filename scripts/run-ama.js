const abi = require('../artifacts/contracts/AMAPortal.sol/AMAPortal.json');

const main = async () => {

    const contractAddress = "0xb91671A21b25a11eAd0d2b4cCadAe5b154941916";
    const contractAbi = abi.abi;

    const [signer] = await ethers.getSigners();
    const amaPortalContract = new ethers.Contract(contractAddress, contractAbi, signer);

    // let question = await amaPortalContract.askQuestion("How are you?");
    // await question.wait();

    // let upvotedQuestin = await amaPortalContract.upvoteQuestion(1);
    // await upvotedQuestin.wait();

    // let retunredQuestion = await amaPortalContract.idToQuestion(1);
    // console.log(`Question: ${retunredQuestion}`);

    let answeredQuestion = await amaPortalContract.answerQuestion(1, "Earth, only planet we got so we should save it!");
    await answeredQuestion.wait();

    // retunredQuestion = await amaPortalContract.idToQuestion(1);
    // console.log(`Question: ${retunredQuestion}`);

}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();