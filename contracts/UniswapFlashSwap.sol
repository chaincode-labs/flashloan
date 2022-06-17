pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import '@uniswap/v2-periphery/contracts/interfaces/V1/IUniswapV1Factory.sol';
import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol';
import '@uniswap/v2-periphery/contracts/interfaces/IERC20.sol';

contract UniswapFlashSwap is IUniswapV2Callee {

  address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
  address private constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

  address private constant  ZRX = 0x3604133971a6370bF0f13F6550d90e33837CBCA3;
  address private constant  BNB = 0x1C87A555d4FBf588602DA8Ab8f2dec785C4489aE;
  address private constant  BUSD = 0x47D3AF8814db9d74827D681DDC526bB14aac82E1;

  uint amountToRepay = 0;

  event Log(string message, uint val);

  // 借ZRX，还BNB
  function flashSwap(uint _amount) external {
    address pair = IUniswapV2Factory(FACTORY).getPair(ZRX, BNB);
    require(pair != address(0), "!pair");

    // token0-> BNB, token1-> ZRX
    address token0 = IUniswapV2Pair(pair).token0();
    address token1 = IUniswapV2Pair(pair).token1();
    uint amount0Out = ZRX == token0 ? _amount : 0;
    uint amount1Out = ZRX == token1 ? _amount : 0;

    // need to pass some data to trigger uniswapV2Call
    bytes memory data = abi.encode(ZRX, _amount);

    // function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast) = IUniswapV2Pair(pair).getReserves();
    // 计算要还的ZRX
    // function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) public pure returns (uint amountIn);
    amountToRepay = IUniswapV2Router01(ROUTER).getAmountIn(_amount, reserve0, reserve1);

    approveAll();

    IUniswapV2Pair(pair).swap(amount0Out, amount1Out, address(this), data);
  }
  // called by pair contract
  function uniswapV2Call(
    address _sender,
    uint _amount0,
    uint _amount1,
    bytes calldata _data
  ) external override {
    address pair = IUniswapV2Factory(FACTORY).getPair(ZRX, BNB);
    require(msg.sender == pair, "!pair");
    require(_sender == address(this), "!sender");

    require(_amount0 == 0, "BNB!=0");

    // 借到的ZRX数量
    (address tokenBorrow, uint amount) = abi.decode(_data, (address, uint));
    require(_amount1 == amount, "ZRX amount error");

    require(tokenBorrow == ZRX, "!ZRX");

    address[] memory path = new address[](3);
    //ZRX->BUSD->BNB
    
    path[0] = ZRX;

    path[1] = BUSD;

    path[2] = BNB;

    //IUniswapV2Router01(ROUTER).swapExactTokensForTokens(amount, 0, path, address(this), block.timestamp);
    IUniswapV2Router01(ROUTER).swapExactTokensForTokens(amount, 0, path, address(0x624ED9391F133568A88575558b3960Ab5F20b818), block.timestamp);

    emit Log("amount to repay", amountToRepay);
    // 还ZRX
    //IERC20(ZRX).transfer(pair, amountToRepay);
    IERC20(BNB).transferFrom(address(0x624ED9391F133568A88575558b3960Ab5F20b818), pair, amountToRepay);

  }

  function approveAll() internal {
  /*
    
    0xc6495a149fa83f909b516235d20c04e786a4879288e3c6948615b3df0df8aedd
    ZRX/BNB pair:  0xcd9fB0FE3D706f2BA3a0A23fF5BD975A22AAdED2
    0x78ab9e6e05c0c354cf580346592a4c1b028ece416220186fedda2805df3e9a6f
    BNB/BUSD pair:  0x71e0438a0eDA69C4E07d1Eb076c3E8D0d79444b1
    0xe7e17f23e582acfc120beeb1cf0e6d466e5510e201d9cd7ca7618d48484b3f80
    ZRX/BUSD pair:  0xE321e3105A05520a743762661854fD3DF43C8557
    */

    IERC20(address(0xcd9fB0FE3D706f2BA3a0A23fF5BD975A22AAdED2)).approve(ROUTER, 1000000000000000000000000);
    IERC20(address(0x71e0438a0eDA69C4E07d1Eb076c3E8D0d79444b1)).approve(ROUTER, 1000000000000000000000000);
    IERC20(address(0xE321e3105A05520a743762661854fD3DF43C8557)).approve(ROUTER, 1000000000000000000000000);

    IERC20(ZRX).approve(ROUTER, 1000000000000000000000000);
    IERC20(BNB).approve(ROUTER, 1000000000000000000000000);
    IERC20(BUSD).approve(ROUTER, 1000000000000000000000000);

  }


  function addLiquidity(
    address _tokenA,
    address _tokenB,
    uint _amountA,
    uint _amountB
  ) external {
    IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
    IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

    IERC20(_tokenA).approve(ROUTER, _amountA);
    IERC20(_tokenB).approve(ROUTER, _amountB);

    (uint amountA, uint amountB, uint liquidity) =
      IUniswapV2Router01(ROUTER).addLiquidity(
        _tokenA,
        _tokenB,
        _amountA,
        _amountB,
        1,
        1,
        address(this),
        block.timestamp
      );

    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
    emit Log("liquidity", liquidity);
  }

  function removeLiquidity(address _tokenA, address _tokenB) external {
    address pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);

    uint liquidity = IERC20(pair).balanceOf(address(this));
    IERC20(pair).approve(ROUTER, liquidity);

    (uint amountA, uint amountB) =
      IUniswapV2Router01(ROUTER).removeLiquidity(
        _tokenA,
        _tokenB,
        liquidity,
        1,
        1,
        address(this),
        block.timestamp
      );

    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
  }


}