pragma solidity =0.6.6;


interface iReCall {
    function callback(uint256 amount) external;
}
interface iReTest {
    function transfer(uint256 amount) external;
}