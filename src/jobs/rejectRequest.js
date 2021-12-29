import { createRequire } from 'module'; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method

const cron = require('node-cron');

import { rejectRequests } from '../../db/interface/orderInterface.js';

/**
 * Runs the scheduler every day at 00:00:00
 */
const rejectRequestEvery2days = cron.schedule('0 0 * * *' , async function(){
    try {
        const d = new Date()
        console.log("Every minute: " , d );
        d.setDate( d.getDate() - 2 )
        // d.setMinutes( d.getMinutes() - 2 )
        await rejectRequests( d );
    }catch(e){
        console.log("Error in scheduling");
    }
});



export default rejectRequestEvery2days;