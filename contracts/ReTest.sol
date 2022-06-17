pragma solidity =0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./iRe.sol";

contract ReTest is iReTest {
    uint256 private  balance = 10000;
    address private constant  ZRX = 0x3604133971a6370bF0f13F6550d90e33837CBCA3;

    function transfer(uint256 amount) external override {
        if (balance >= amount) {

            IERC20(ZRX).transfer(msg.sender, amount);

            iReCall(msg.sender).callback(amount);

            balance = balance - amount;

        }


    }
}