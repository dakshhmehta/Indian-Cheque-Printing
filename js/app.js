navigator.serviceWorker.register('../service-worker.js');
// 12:30 to 1:51

function number_format(number, decimals, dec_point, thousands_point) {
    if (number == null || !isFinite(number)) {
        throw new TypeError("number is not valid");
    }

    if (!decimals) {
        var len = number.toString().split('.').length;
        decimals = len > 1 ? len : 0;
    }

    if (!dec_point) {
        dec_point = '.';
    }

    if (!thousands_point) {
        thousands_point = ',';
    }

    var length = number.toString().length;
    console.log(length);
    number = parseFloat(number).toFixed(decimals);

    number = number.replace(".", dec_point);

    var splitNum = number.split(dec_point);
    if(length >= 7){
	    splitNum[0] = splitNum[0].replace(/\B(?=(\d{7})+(?!\d))/g, thousands_point);
    }
    if(length >= 5){
	    splitNum[0] = splitNum[0].replace(/\B(?=(\d{5})+(?!\d))/g, thousands_point);
    }
    splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
    number = splitNum.join(dec_point);

    return number;
}


var app = new Vue({
	el: "#app",
	data: {
		date: moment().format('YYYY-MM-DD').toString(),
		name: '',
		amount: 0,
		is_ac_pay: true,
		bank: 'ubi'
	},
	computed: {
		date_formatted: function(){
			return moment(this.date).format('DDMMYYYY');
		},
		amountFormatted: function(){
			return number_format(this.amount, 0, '.', ',');
		},
		amountInWords: function(){
			var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
			var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
		    
		    if ((num = this.amount.toString()).length > 9) return 'overflow';
		    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
		    if (!n) return; var str = '';
		    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
		    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
		    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
		    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
		    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'ONLY ' : '';
		    return str;
		}
	},

})