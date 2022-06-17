 const ZRX = "0x3604133971a6370bF0f13F6550d90e33837CBCA3";
 const BNB = "0x1C87A555d4FBf588602DA8Ab8f2dec785C4489aE";
 const BUSD = "0x47D3AF8814db9d74827D681DDC526bB14aac82E1";


 const ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
 const ABI = [
    'function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) public pure returns (uint amountIn)',
    'function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) pure returns (uint amountOut)',
    'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)'
];

 const GET_RESERVES_ABI= [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)'
];


module.exports = {
    ZRX,
    BNB,
    BUSD,
    ROUTER,
    ABI,
    GET_RESERVES_ABI,
};