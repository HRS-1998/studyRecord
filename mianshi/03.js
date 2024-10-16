/* 1台收割机收割给不同地块收割获得钱不同，同时耗费的油量也不同；以下是 6 个地块的耗油
 量和收益的列表[(1, 1), (7, 9), (6, 10), (2, 4), (3, 5), (6, 10)]，请问收割机在给定油量 n=10 （n≥1）的情
 况下，如何尽可能赚到更多的钱？
 */


/*01背包问题，对于每个地块可以选择收割或者不收割，对于当前为i的地块，可以选择不收割，也可以选择收割，
1.收割，则收益为 max(dp[i-1][j],dp[i-1][j-oil]+money)
2.不收割，则收益为 dp[i-1][j]
*/

function maxProfit(n, arr) {
    const len = arr.length;
    const dp = new Array(len + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for (let i = 1; i <= len; i++) {
        let [oil, money] = arr[i - 1];
        for (let j = 1; j <= n; j++) {
            if (j >= oil) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - oil] + money);
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[len][n];

}
let arr = [[1, 1], [7, 9], [6, 10], [2, 4], [3, 5], [6, 10]]
console.log(maxProfit(10, arr))
