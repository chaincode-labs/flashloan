pragma solidity =0.6.6;

import "./iRe.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract ReCall  is iReCall {
    address private constant  ZRX = 0x3604133971a6370bF0f13F6550d90e33837CBCA3;

    function callRe(address addr, uint256 amount) external {
            iReTest(addr).transfer(amount);
    }

    function callback(uint256 amount) external override {
   
        uint256 balance =  IERC20(ZRX).balanceOf(msg.sender);
        if (balance >= amount) {
            iReTest(msg.sender).transfer(amount);
        }        
    }
}