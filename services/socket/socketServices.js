const mongoose = require('mongoose');
const liveRateCryptoSchema = require('../../models/liveRateCrypto.model');
const liveRateBondSchema = require('../../models/liveRateBonds.model');

const LiveRateStock = mongoose.model('LiveRateStock', liveRateCryptoSchema, 'iexStocks');
const LiveRateBond = mongoose.model('LiveRateBond', liveRateBondSchema, 'liveRateBonds');
const LiveRateCrypto = mongoose.model('LiveRateCrypto', liveRateCryptoSchema, 'liveRateCrypto');
const LiveRateComodity = mongoose.model('LiveRateComodity', liveRateCryptoSchema, 'liveRateComodity');
const LiveRateCurrencyPair = mongoose.model('LiveRateCurrencyPair', liveRateCryptoSchema, 'liveRateCurrencyPairs1');
const LiveRateRest = mongoose.model('LiveRateRest', liveRateCryptoSchema, 'liveRateIndexes');

exports.connectToSocket = (io) => {
    io.on('connection', function (socket) {
        socket.on('disconnect', () => {
        });
    });


    LiveRateBond.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.tp": { $gte: -1 } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            console.log(data)
            io.emit("react", ["TPupdated", data, 'bonds']);
        });


    LiveRateStock.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.tp": { $gte: -1 } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            console.log(data)
            io.emit("react", ["TPupdated", data, 'stocks']);
        });


    LiveRateCrypto.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.tp": { $gte: -1 } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            console.log(data)
            io.emit("react", ["TPupdated", data, 'crypto']);
        });


    LiveRateComodity.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.tp": { $gte: -1 } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            console.log(data)
            io.emit("react", ["TPupdated", data, 'comodity']);
        });


    LiveRateCurrencyPair.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.tp": { $gte: -1 } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            console.log(data)
            io.emit("react", ["TPupdated", data, 'pairs']);
        });



    LiveRateRest.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.tp": { $gte: -1 } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
            console.log(data)
            io.emit("react", ["TPupdated", data, 'rest']);
        });



    LiveRateStock.watch([{
        $match: {
            $and: [
                { "updateDescription.updatedFields.succeeded": { $exists: true } },
                { operationType: "update" }]
        }
    }]).
        on('change', data => {
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