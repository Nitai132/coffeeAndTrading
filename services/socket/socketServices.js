const mongoose = require('mongoose');
const liveRateCryptoSchema = require('../../models/liveRateCrypto.model');
const liveRateBondSchema = require('../../models/liveRateBonds.model');
const usersPositionsIBSchema = require('../../models/userPositionsIB.model');

const LiveRateStock = mongoose.model('LiveRateStock', liveRateCryptoSchema, 'liveRateStocks');
const LiveRateBond = mongoose.model('LiveRateBond', liveRateBondSchema, 'liveRateBonds');
const LiveRateCrypto = mongoose.model('LiveRateCrypto', liveRateCryptoSchema, 'liveRateCrypto');
const LiveRateComodity = mongoose.model('LiveRateComodity', liveRateCryptoSchema, 'liveRateComodity');
const LiveRateCurrencyPair = mongoose.model('LiveRateCurrencyPair', liveRateCryptoSchema, 'liveRateCurrencyPairs1');
const LiveRateRest = mongoose.model('LiveRateRest', liveRateCryptoSchema, 'liveRateIndexes');
const usersPositionsIB = mongoose.model('usersPositionsIB', usersPositionsIBSchema, 'usersPositionsIB',)



exports.connectToSocket = (io) => {
    io.on('connection', function (socket) {
        socket.on('disconnect', () => {
        });
    });

    // LiveRateBond.watch([{
    //     $match: {
    //         $and: [
    //             { "updateDescription.updatedFields.tp": { $gte: -1 } },
    //             { operationType: "update" }]
    //     }
    // }]).
    //     on('change', data => {
    //         console.log(data)
    //         io.emit("react", ["TPupdated", data, 'bonds']);
    //     });


    // LiveRateStock.watch([{
    //     $match: {
    //         $and: [
    //             { "updateDescription.updatedFields.tp": { $gte: -1 } },
    //             { operationType: "update" }]
    //     }
    // }]).
    //     on('change', data => {
    //         console.log(data)
    //         io.emit("react", ["TPupdated", data, 'stocks']);
    //     });


    // LiveRateCrypto.watch([{
    //     $match: {
    //         $and: [
    //             { "updateDescription.updatedFields.tp": { $gte: -1 } },
    //             { operationType: "update" }]
    //     }
    // }]).
    //     on('change', data => {
    //         console.log(data)
    //         io.emit("react", ["TPupdated", data, 'crypto']);
    //     });


    // LiveRateComodity.watch([{
    //     $match: {
    //         $and: [
    //             { "updateDescription.updatedFields.tp": { $gte: -1 } },
    //             { operationType: "update" }]
    //     }
    // }]).
    //     on('change', data => {
    //         console.log(data)
    //         io.emit("react", ["TPupdated", data, 'comodity']);
    //     });


    // LiveRateCurrencyPair.watch([{
    //     $match: {
    //         $and: [
    //             { "updateDescription.updatedFields.tp": { $gte: -1 } },
    //             { operationType: "update" }]
    //     }
    // }]).
    //     on('change', data => {
    //         console.log(data)
    //         io.emit("react", ["TPupdated", data, 'pairs']);
    //     });



    // LiveRateRest.watch([{
    //     $match: {
    //         $and: [
    //             { "updateDescription.updatedFields.tp": { $gte: -1 } },
    //             { operationType: "update" }]
    //     }
    // }]).
    //     on('change', data => {
    //         console.log(data)
    //         io.emit("react", ["TPupdated", data, 'rest']);
    //     });


    usersPositionsIB.watch([{
        $match: {
            operationType: "update"
        }
    }]).
        on('change', async (data) => {
            console.log(data);
            if (Object.keys(data.updateDescription.updatedFields)[0] === 'takeProfit.0.marketPrice') {
                const position = await usersPositionsIB.find({ _id: data.documentKey._id });
                io.emit("react", ["TPupdated", data, position[0].positionType.toLowerCase(), Object.values(data.updateDescription.updatedFields)[0]]);

            } else if (Object.keys(data.updateDescription.updatedFields)[0] === 'takeProfit.1.marketPrice') {
                console.log(data.updateDescription.updatedFields[0])
                const position = await usersPositionsIB.find({ _id: data.documentKey._id });
                io.emit("react", ["TPupdated", data, position[0].positionType.toLowerCase(), Object.values(data.updateDescription.updatedFields)[0]]);

            } else if (Object.keys(data.updateDescription.updatedFields)[0] === 'takeProfit.2.marketPrice') {
                console.log(data.updateDescription.updatedFields[0])
                const position = await usersPositionsIB.find({ _id: data.documentKey._id });
                io.emit("react", ["TPupdated", data, position[0].positionType.toLowerCase(), Object.values(data.updateDescription.updatedFields)[0]]);

            } else if (Object.keys(data.updateDescription.updatedFields)[0] === 'takeProfit.3.marketPrice') {
                console.log(data.updateDescription.updatedFields[0])
                const position = await usersPositionsIB.find({ _id: data.documentKey._id });
                io.emit("react", ["TPupdated", data, position[0].positionType.toLowerCase(), Object.values(data.updateDescription.updatedFields)[0]]);

            } else if (Object.keys(data.updateDescription.updatedFields)[0] === 'takeProfit.4.marketPrice') {
                console.log(data.updateDescription.updatedFields[0])
                const position = await usersPositionsIB.find({ _id: data.documentKey._id });
                io.emit("react", ["TPupdated", data, position[0].positionType.toLowerCase(), Object.values(data.updateDescription.updatedFields)[0]]);

            } 
        });



    LiveRateStock.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.succeeded": { $exists: true } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            console.log(data)
            io.emit("react", ["PositionClosed", data, 'stocks']);
        });

    LiveRateBond.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.succeeded": { $exists: true } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            io.emit("react", ["PositionClosed", data, 'bonds']);
        });
    LiveRateCrypto.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.succeeded": { $exists: true } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            io.emit("react", ["PositionClosed", data, 'crypto']);
        });
    LiveRateComodity.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.succeeded": { $exists: true } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            io.emit("react", ["PositionClosed", data, 'comodity']);
        });
    LiveRateCurrencyPair.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.succeeded": { $exists: true } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            io.emit("react", ["PositionClosed", data, 'pairs']);
        });
    LiveRateRest.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.succeeded": { $exists: true } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            io.emit("react", ["PositionClosed", data, 'rest']);
        });


}