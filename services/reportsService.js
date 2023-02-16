const mongoose = require("mongoose");
const userSchema = require("./../models/users.model");
const fetch = require("isomorphic-fetch");
const usersPositionSchema = require("../models/usersPositions.model");
const liveRateBondSchema = require("./../models/liveRateBonds.model");
const liveRateCryptoSchema = require("../models/liveRateCrypto.model");

const LiveRateBond = mongoose.model(
  "LiveRateBond",
  liveRateBondSchema,
  "liveRateBonds"
);
const LiveRateCrypto = mongoose.model(
  "LiveRateCrypto",
  liveRateCryptoSchema,
  "liveRateCrypto"
);
const LiveRateComodity = mongoose.model(
  "LiveRateComodity",
  liveRateCryptoSchema,
  "liveRateComodity"
);
const LiveRateCurrencyPair = mongoose.model(
  "LiveRateCurrencyPair",
  liveRateCryptoSchema,
  "liveRateCurrencyPairs1"
);
const LiveRateRest = mongoose.model(
  "liveRateIndexes",
  liveRateCryptoSchema,
  "liveRateIndexes"
);
const LiveRateStock = mongoose.model(
  "LiveRateStock",
  liveRateCryptoSchema,
  "liveRateStocks"
);

const UserPositions = mongoose.model(
  "userPositions",
  usersPositionSchema,
  "userspositions"
);

const User = mongoose.model("User", userSchema); //שימוש במודל וסכמה של משתמש

// מייצר את הטבלה מקבל נתונים מהמונגו ושולח דרך שיטס בסט למסמך עצמו 
const createReport = async (type, amount, userEmail) => {
  try {
  var buy = `"BUY"`;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const createSheet = async (exchange, array, userEmail, amount) => {
    console.log(1)
  for (let i = 1; i < array.length; i++) {  
    // URL from sheet best
     fetch(`https://sheet.best/api/sheets/cfda1ecc-d3f4-4642-a7b5-defff7a75dbd/${i}`, { 
     method: "PATCH",
     mode: "cors",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
   
       SYMBOL: array[i].symbol,
   
       TYPE: exchange, 
   
       DATE: array[i].startDate.substring(0, 10),
   
       "OPEN TIME": array[i].startDate.slice(11),
   
       "CLOSE TIME": array[i].endDate.slice(11),
   
       "END DATE": array[i].endDate.substring(0, 10),
   
       "TOTAL TRADING TIME": `=E${i+2}-D${i+2}`,
   
       "MARKET CLOSE POSITION PRICE": array[i].endPrice,
   
       "MARKET OPEN POSITION PRICE": array[i].startPrice,
   
       "BUY/SELL": array[i].operation.toUpperCase(),
   
       "QUANTITY OF SHARES": "100",
   
       "LOT SIZE": `=IF(J${i+2}=${buy},H${i+2}*K${i+2},K${i+2}*I${i+2})`,
   
       "NEW DRAWDOWN%": `=IF(O${i+2}<0, IFERROR(IF(MIN($O$1:O${i+2})<>O${i+2}," ",MIN($O$1:O${i+2})),"")," ")`,
   
       "NEW PEAK%": `=IFERROR(IF(MAX($O$1:O${i+2})<>O${i+2}," ",MAX($O$1:O${i+2})),"")`,
   
       "PROFIT/LOSS%": `=IFERROR((P${i+2}*100%)/S${i+2},0)`,
   
       "PROFIT/LOSS WITHOUT BROKER FEE": `=IF(J${i+2}=${buy},K${i+2}*(H${i+2}-I${i+2}),K${i+2}*(I${i+2}-H${i+2}))`,
   
       "BROKER FEE": `=IF(K${i+2}>250,K${i+2}/100,2.5)`,
   
       "PROFIT/LOSS WITH BROKER FEE": `=IF(ISBLANK(P${i+2}),0,P${i+2}-Q${i+2})`,
   
       EQUITY: `=IF(ISBLANK(A${i+2}),0,S${i+1}+R${i+2})`,
  
       "STOP LOSS PRICE": array[i].sp,
  
       "TAKE PROFIT 1": array[i].tp,
  
       "TAKE PROFIT 2": null,
  
       "TAKE PROFIT 3": null,
  
       "TAKE PROFIT 4": null,
  
       "TAKE PROFIT 5": null,
  
       "R1 BUY/SELL": `=IF(J${i+2}="SELL",T${i+2}-I${i+2},I${i+2}-T${i+2})`,
  
       "TAKE PROFIT 1 OPEN POSITION": `=IF(J${i+2}="SELL",I${i+2}-U${i+2},U${i+2}-I${i+2})`,
  
       "TAKE PROFIT 2 OPEN POSITION 1": `=IF(J${i+2}="SELL",U${i+2}-V${i+2},V${i+2}-U${i+2})`,
  
       "TAKE PROFIT 3 OPEN POSITION 2": `=IF(J${i+2}="SELL",V${i+2}-W${i+2},W${i+2}-V${i+2})`,
  
       "TAKE PROFIT 4 OPEN POSITION 3": `=IF(J${i+2}="SELL",W${i+2}-X${i+2},X${i+2}-W${i+2})`,
  
       "TAKE PROFIT 5 OPEN POSITION 4": `=IF(J${i+2}="SELL",X${i+2}-Y${i+2},Y${i+2}-X${i+2})`,
  
     }),
   })
     .then((r) => r.json())
     .then(console.log)
     .catch(console.error);
   }
  
    await delay(20000); 

    // URL from sheet best
     fetch("https://sheet.best/api/sheets/cfda1ecc-d3f4-4642-a7b5-defff7a75dbd/0", {
     method: "PATCH",
     mode: "cors",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
   
       SYMBOL: array[0].symbol,
   
       TYPE: exchange,  
   
       DATE: array[0].startDate.substring(0, 10),
   
       "OPEN TIME": array[0].startDate.slice(10),
   
       "CLOSE TIME": array[0].endDate.slice(10),
   
       "END DATE": array[0].endDate.substring(0, 10),
   
       "TOTAL TRADING TIME": `=E2-D2`, 
   
       "MARKET CLOSE POSITION PRICE": array[0].endPrice,
   
       "MARKET OPEN POSITION PRICE": array[0].startPrice,
   
       "BUY/SELL": array[0].operation.toUpperCase(),
   
       "QUANTITY OF SHARES": "100",
   
       "LOT SIZE": `=IF(J2=${buy},H2*K2,K2*I2)`,  
   
       "NEW DRAWDOWN%": `=IFERROR(IF(S2>AF2," ",O2))`,
   
       "NEW PEAK%": `=IFERROR(IF(S2>AF2,O2," "))`,
   
       "PROFIT/LOSS%": `=IFERROR((P2*100%)/S2,0)`,
   
       "PROFIT/LOSS WITHOUT BROKER FEE": `=IF(J2=${buy},K2*(H2-I2),K2*(I2-H2))`,
   
       "BROKER FEE": `=IF(K2>250,K2/100,2.5)`,
   
       "PROFIT/LOSS WITH BROKER FEE": `=IF(ISBLANK(P2),0,P2-Q2)`,
   
       EQUITY: `=AF2+R2`,
  
       "STOP LOSS PRICE": array[0].sp,
  
       "TAKE PROFIT 1": array[0].tp,
  
       "TAKE PROFIT 2": null,
  
       "TAKE PROFIT 3": null,
  
       "TAKE PROFIT 4": null,
  
       "TAKE PROFIT 5": null,
  
       "R1 BUY/SELL": `=IF(J2="SELL",T2-I2,I2-T2)`,
  
       "TAKE PROFIT 1 OPEN POSITION": `=IF(J2="SELL",I2-U2,U2-I2)`,
  
       "TAKE PROFIT 2 OPEN POSITION 1": `=IF(J2="SELL",U2-V2,V2-U2)`,
  
       "TAKE PROFIT 3 OPEN POSITION 2": `=IF(J2="SELL",V2-W2,W2-V2)`,
  
       "TAKE PROFIT 4 OPEN POSITION 3": `=IF(J2="SELL",W2-X2,X2-W2)`,
  
       "TAKE PROFIT 5 OPEN POSITION 4": `=IF(J2="SELL",X2-Y2,Y2-X2)`,
  
       "Starting Balance Amount": amount, 
  
       "EMAIL": userEmail,
     }),
   })
     .then((r) => r.json())
     .then(console.log)
     .catch(console.error);
   }

    const userPositions = await UserPositions.find({ user: userEmail }); // לפי המייל של המשתמש מחזיר את הפוזיציות

    const cryptos = userPositions[0].crypto;      
    const pairs = userPositions[0].pairs; 
    const stocks = userPositions[0].stocks;
    const rest_indexes = userPositions[0].rest;
    const comodity = userPositions[0].comodity;
    const bonds = userPositions[0].bonds;

    const finalArrayForPosIds = [];

    if(type === "Cryptos" || "allPositions"){
    finalArrayForPosIds.push(cryptos);
    }

    if(type === "Pairs" || "allPositions"){
    finalArrayForPosIds.push(pairs);
    }

    if(type === "Stocks" || "allPositions"){
    finalArrayForPosIds.push(stocks);
    }

    if(type === "Rest" || "allPositions"){
    finalArrayForPosIds.push(rest_indexes);
    }

    if(type === "Comodity" || "allPositions"){
    finalArrayForPosIds.push(comodity);
    }

    if(type === "Bonds" || "allPositions"){
    finalArrayForPosIds.push(bonds);
    }
    
    const finalPositionsCryptos = [];
    const finalPositionsPairs = [];
    const finalPositionsStocks = [];
    const finalPositionsComodity = [];
    const finalPositionsBonds = [];
    const finalPositionsRest = [];

  if(type === "Cryptos" || "allPositions"){
    for (var i = 0; i < cryptos.length; i++) {
      const response = await LiveRateCrypto.find({ _id: cryptos[i] });
      finalPositionsCryptos.push(response);
    }
  }

  if(type === "Pairs" || "allPositions"){
    for (var i = 0; i < pairs.length; i++) {
      const response = await LiveRateCurrencyPair.find({ _id: pairs[i] });
      finalPositionsPairs.push(response);
    }
  }

  if(type === "Stocks" || "allPositions"){
    for (var i = 0; i < stocks.length; i++) {
      const response = await LiveRateStock.find({ _id: stocks[i] });
      finalPositionsStocks.push(response);
    }
  }

  if(type === "Rest" || "allPositions"){
    for (var i = 0; i < rest_indexes.length; i++) {
      const response = await LiveRateRest.find({ _id: rest_indexes[i] });
      finalPositionsRest.push(response);
    }
  }

  if(type === "Comodity" || "allPositions"){
    for (var i = 0; i < comodity.length; i++) {
      const response = await LiveRateComodity.find({ _id: comodity[i] });
      finalPositionsComodity.push(response);
    }
  }

  if(type === "Bonds" || "allPositions"){
    for (var i = 0; i < bonds.length; i++) {
      const response = await LiveRateBond.find({ _id: bonds[i] });
      finalPositionsBonds.push(response);
    }
  }

  if(type === "Cryptos"){
    const finalPositionsallPositions = [].concat(
      ...finalPositionsCryptos  
    );
    return createSheet(type, finalPositionsallPositions, userEmail, amount);  
  }

  if(type === "Pairs"){
    const finalPositionsallPositions = [].concat(
      ...finalPositionsPairs  
    );
    return createSheet(type, finalPositionsallPositions, userEmail, amount);  
  }

    if(type === "Stocks"){
      const finalPositionsallPositions = [].concat(
        ...finalPositionsStocks 
      );
      return createSheet(type, finalPositionsallPositions, userEmail, amount);
    }  

  if(type === "Rest"){
    const finalPositionsallPositions = [].concat(
      ...finalPositionsRest  
    );
    return createSheet(type, finalPositionsallPositions, userEmail, amount);  
  }

  if(type === "Comodity"){
    const finalPositionsallPositions = [].concat(
      ...finalPositionsComodity 
    );
    return createSheet(type, finalPositionsallPositions, userEmail, amount);  
  }

  if(type === "Bonds"){
    const finalPositionsallPositions = [].concat(
      ...finalPositionsBonds  
    );
    return createSheet(type, finalPositionsallPositions, userEmail, amount);
  }

  if(type === "allPositions"){
  const finalPositionsallPositions = [].concat(
    ...finalPositionsCryptos,
    ...finalPositionsPairs,
    ...finalPositionsBonds,
    ...finalPositionsRest,
    ...finalPositionsStocks,
    ...finalPositionsComodity
  );
    return createSheet(type, finalPositionsallPositions, userEmail, amount);
  }
} catch (err) {
  //במקרה של כשלון
  throw err;
}
};

module.exports = { createReport };
