
export default function Balance({ sum }: any) {

   function currencyFormat(num: any) {
      return num
         .toFixed(2)
         .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
         + ' PLN';
   }
   return (
      <div className="item balance">
         {sum ? `Saldo ${currencyFormat(sum)}` : "Balance: 0 PLN"}
      </div>
   )
}
